/**
 * 为了快速在各个页面之间来回跳转，提升开发效率，用此脚本获取当前页面的所有路径以及提供能在各个页面之间直接跳转的go方法
 * 使用方式：
 *     window.beacon = new Beacon(rootRoute);
 *     beacon.go()()/ beacon.go()(2)/beacon.go('additional')(3)
 */
const pathToRegexp = require('path-to-regexp');
let Beacon = () => {};
if (__DEVELOPMENT__) {
  //是否记录上次访问页面记录，如果记录的话下次在调用的时候，基于上次的记录访问下一个子路由页面
  let _recording;
  Beacon = class {
    constructor(rootRoute = {}, baseName = '/services') {
      console.error(' constructor:', arguments);
      this.rootRoute = rootRoute;
      this.baseName = baseName;
      //当前项目的所有页面url
      this.allPaths = this.getAllPaths();
      let { curModule, curPath } = this.getCurPageInfo();
      //当前页面module
      this.curModule = curModule;
      //当前module下的path
      this.curPath = curPath;
    }

    getCurPageInfo() {
      const curModule = location.pathname.split(`${this.baseName}/`)[1].split('/')[0];
      const route = this.allPaths[curModule].find((item) => item.href === location.href);
      const curPath = route.path;
      return {
        curModule,
        curPath,
      };
    }

    /**
     * 获取所有module下的所有子路由的绝对url
     */
    getAllPaths() {
      const routes = this.rootRoute.childRoutes || [];
      return (
        routes &&
        routes.reduce((acc, route) => {
          let { path } = route;

          if (path.indexOf('/') === 0) {
            path = path.substring(1);
          }

          const _route = Object.assign({}, route, { path });
          //得到当前module的所有子路由的绝对url
          const paths = this.getChildRoutesURL(_route);
          paths && (acc[path] = paths);

          return acc;
        }, {})
      );
    }

    /**
     * 对含有正则的path进行转换处理
     */
    transformPath(pathname) {
      let keys = [];
      pathToRegexp(pathname, keys);

      if (keys.length) {
        //模糊路由
        pathname = pathname.replace(/[\(\)]/g, '').replace(/\/:/g, '/');
      }

      return pathname;
    }

    generateURL(route = {}) {
      const { moduleName, path, rawPath } = route;
      return {
        // moduleName,
        path,
        //原来的path
        rawPath,
        href: `${location.origin}${this.baseName}${moduleName}${location.search}`,
      };
    }

    getChildRoutesURL(route, moduleName = '', accumulator = []) {
      const { path: rawPath = '', childRoutes } = route;

      if (!route || !rawPath.indexOf('*')) {
        //过滤掉所有以'*'开通的path
        return '';
      }

      const path = this.transformPath(rawPath);
      moduleName = `${moduleName}/${path}`;
      Object.assign(route, { path, rawPath, moduleName });

      if (!Array.isArray(childRoutes)) {
        accumulator.push(this.generateURL(route));
        return accumulator;
      }

      childRoutes.forEach((curRoute) => {
        //递归子路由
        this.getChildRoutesURL(curRoute, moduleName, accumulator);
      });

      return accumulator;
    }

    /**
     * 跳转到指定页面
     * 使用方式: go()() / go()(1) / go('additional')(2)
     *  @param {String} moduleName - 模块名字
     *  @param {String} index - 当前模块的子路由索引位置
     */
    go(moduleName = '', recording = true) {
      moduleName = moduleName || this.curModule;
      _recording = recording; //默认记录
      return (index) => {
        let i = index || 0;
        const curRoute = this.allPaths[moduleName];

        if (!curRoute) {
          return console.log(`没有此module:${moduleName}`);
        }

        if (index === undefined && _recording) {
          //如果记录上次访问的页面，则再次调用go函数时是跳转到当前页面的下一个子路由页面,快速切换到下一个子页面
          //如果访问到最后一个子页面的时候,再次调用go函数时会跳转到第一个子路由页面
          i = curRoute.findIndex((item) => item.path === this.curPath) + 1;
        }
        i >= curRoute.length && (i = 0);

        const { href = '', path, rawPath } = curRoute[i];
        if (path != rawPath) {
          //模糊路径
          console.warn(
            `当前页面path为:${rawPath},该路径为模糊路径，请手动修改页面url后在跳转到该页面`
          );
        }
        href && (location.href = href);
      };
    }
  };
}
export default Beacon;
