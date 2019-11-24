declare module 'sequelize-temporal' { 
	type BaseNameSource = 'MODEL' | 'TABLE' | 'OPTIONS';
	
	interface Options { 
		blocking?: boolean,
		full?: boolean,
		modelSuffix?: string,
		tableSuffix?: string,
		baseNameSource?: BaseNameSource
	}

	function output<T>(define:T, sequelize:any, options?:Options): T

	export = output;
}
