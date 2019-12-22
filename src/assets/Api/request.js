import axios from 'axios'
import GlobalConfig from './global.config'

const getQueryVariable = function (variable) {
	var query = window.location.hash.substring(window.location.hash.indexOf('?')+1);
	var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return (false);
}

//  timeout 10min
const Global_Delay = 10 * 60 * 1000

// const BASE_URL = '/';
const BASE_URL = GlobalConfig.apiConfig.reqBaseUrl;


// 创建axios实例
const axiosInstance = () => {
	const instance = axios.create({
		baseURL: BASE_URL,
		timeout: Global_Delay
	})
	return instance
}


/**
 * 请求拦截器
 * axios 请求的中间件,可根据需求，修改header
 * @param {Object} instance axios实例
 */
const reqMiddleware = (instance) => {
	instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

	instance.interceptors.request.use(
		config => {
			return config
		},
		err => {
			throw new Error(err);
		}
	)
}

/**
 * 响应拦截器
 * axios 请求成功后响应的中间件
 * @param {Object} instance axios实例
 */

const resMinddleware = instance => {
	instance.interceptors.response.use(
		res => {
			if (res) {
                return res.data
			}
		},
		err => {
			console.log('err.response.status', err.response.status);
		    return Promise.reject(err);
		}
	)
}

// 请求的 实例
const publicReq = async params => {
	const { url, method, param } = params

	param['userToken'] = localStorage.getItem('userToken')

	const instance = axiosInstance();
	reqMiddleware(instance)
	resMinddleware(instance)

	return await instance({
		url,
		method,
		[method === 'post' ? 'data' : 'params']: param || {},
		transformRequest: [function (data) {
			let ret = ''
			let index = 0;
			for (let key in data) {
				// if (data[key] === null) {
				// 	ret += `${index === 0 ? '' : '&'}key=&`  //
				// } else {
				ret += `${index === 0 ? '' : '&'}${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
				// }
				index += 1;
			}
			return ret
		}]
	}).then(res => {
		return res
	})
}

// 请求超时函数
const timeoutfn = (delay, url) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve('请求超时');
		}, delay);
	});
};

// 单个请求 存在请求超时
export async function req(params, delay = Global_Delay) {
	console.log('params', params)
	try {
		const response = await Promise.race([
			timeoutfn(delay, params.url),
			publicReq(params),
		]);
		return response;
	} catch (error) {
		throw new Error(error);
	}
}

// 多请求 async loop
export async function multiRequest(reqArr) {
	let res = [];
	if (typeof reqArr !== 'object' && !(reqArr instanceof Array)) {
		throw new Error(`please set ${reqArr} to Array`);
	}
	try {
		const proms = reqArr.map(ele =>
			publicReq({
				url: ele.url,
				method: ele.method || '',
				param: ele.param || {},
			}),
		);

		for (let promise of proms) {
			const response = await promise;
			if (response.status !== 200) {
				throw new Error(response.statusText);
			}

			res.push(response);
		}
		return Promise.resolve(res);
	} catch (error) {
		throw new Error(error);
	}
}

// 多请求 promise
export async function multiRequestWithPromise(reqArr) {
	if (typeof reqArr !== 'object' && !(reqArr instanceof Array)) {
		throw new Error(`please set ${reqArr} to Array`);
	}
	try {
		const proms = reqArr.map(ele =>
			publicReq({
				url: ele.url,
				method: ele.method || '',
				param: ele.param || {},
			}),
		);
		const res = await Promise.all(proms);
		return res;
	} catch (error) {
		console.log(error);
	}
}

// GET request
export async function getRequest(url, param = {}) {
	try {
		const response = await req({
			url,
			method: 'get',
			param,
		});
		return response;
	} catch (err) {
		// 这里走本地模拟数据
		console.log(err);
	}
}

// POST request
export async function postRequest(url, param={}) {
	try {
		const response = await req({
			url,
			method: 'post',
			param,
		});
		return response;
	} catch (err) {
		console.log(err);
	}
}

// multi get request method, return Array of request;
export async function getMultiRequest(url, reqArr) {
	const reqParams = [];
	reqArr.forEach(item => {
		reqParams.push({
			url,
			param: item,
			method: 'get'
		});
	});
	try {
		const response = await multiRequestWithPromise(reqParams);
		return response;
	} catch (err) {
		console.log(err);
	}
}

// multi post request method, return Array of request;
export async function postMultiRequest(url, reqArr) {
	const reqParams = [];
	const { param } = reqArr;
	reqArr.forEach(item => {
		reqParams.push({
			url,
			param: item,
			method: 'post'
		});
	});
	try {
		const response = await multiRequestWithPromise(reqParams);
		return response;
	} catch (err) {
		console.log(err);
	}
}

/**
 * uploadfile request
 * do not request with 'promise.race'
 * only execute single promise request and set 24h timeout -> \/f/\**\/k/\
 *
 * @param {*} url
 * @param {*} param
 */
export async function UploadePostRequest(url, param) {
	try {
		const response = await publicReq({
			url,
			method: 'post',
			param,
		});
		return response;
	} catch (err) {
		console.log(err);
	}
}