const path = require('path');

module.exports = {
	webpack: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@api': path.resolve(__dirname, 'src/api'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@constants': path.resolve(__dirname, 'src/constants'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@routes': path.resolve(__dirname, 'src/routes'),
			'@services': path.resolve(__dirname, 'src/services'),
			'@stores': path.resolve(__dirname, 'src/stores'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			// 필요 시 추가
		},
	},
};
