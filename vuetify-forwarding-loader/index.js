const fs = require('fs')
const {Parser} = require('acorn')
const {camelize} = require('humps')



const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);


module.exports = (source) => {
	const propsRegExp = /\/\* !vuetify-props\(([\w\W]+)\)! \*\//
    const vrfParentRegExp = /vrfParent: ([\w\W]+)[,|\n]/
    const $vuetifyPropsRegExp = /\/\* !\$vuetifyProps! \*\//
	const propsMatches = source.match(propsRegExp)
	const vrfParentMatches = source.match(vrfParentRegExp)

	
	if(!propsMatches) return source

	if(!vrfParentMatches)
		throw "Component with Vuetify forwarding must have vrfParent key"

	
	const componentName = propsMatches[1]
    const vrfParentName = vrfParentMatches[1].replace(/["|']/g, '')
    

	const camelizedComponentName = capitalize(camelize(componentName))
	const doc = JSON.parse(fs.readFileSync(`./vuetify-raw/packages/api-generator/dist/web-types.json`).toString())
	console.log(doc.contributions.html.tags.find((tag) => tag.name === camelizedComponentName))
	const descriptor = fs.readFileSync(`./node_modules/vuetify/lib/components/${camelizedComponentName}/${camelizedComponentName}.js`).toString()
	const nodes = Parser.parse(descriptor, {sourceType: 'module'}).body
	
	const exportDefaultNode = nodes.find((node) => node.type === 'ExportDefaultDeclaration')
	const propertyNodes = exportDefaultNode.declaration.arguments[0].properties
	
	const propsNode = propertyNodes.find((node) => node.key.name === 'props')

	const vrfProps = [
        'autofocus',
        'value'
	].reduce((index, name) => index[name] = true && index, {})
	
	const propsNodes = propsNode.value.properties
	
	const propsNodesFiltered = propsNodes.filter((node) => !vrfProps[node.key.name])
	
	const propsCode = propsNodesFiltered.map((node) => "  " + descriptor.substr(node.start, node.end - node.start)).join(",\n") + ","


    source = source.replace(new RegExp(propsRegExp, "g"), propsCode)
    
    source = source.replace($vuetifyPropsRegExp, '$vuetifyProps() { return ' + JSON.stringify(propsNodesFiltered.map((node) => node.key.name)) + '.reduce((index, propName) => {index[propName] = this[propName]; return index}, {}) },')

	return source	
}
