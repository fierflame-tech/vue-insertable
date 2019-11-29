
/*!
 * vue-router v0.1.0
 * (c) 2019 Wang Chenxu
 * @license MIT
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = global || self, global.VueInsertable = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function cloneVNodeData(data) {
    const {
      key,
      slot,
      ref,
      staticClass,
      class: className,
      staticStyle,
      style,
      props,
      attrs,
      domProps,
      on,
      nativeOn,
      show,
      directives,
      keepAlive
    } = data;
    return {
      key,
      slot,
      ref,
      refInFor: true,
      staticClass,
      class: className,
      staticStyle,
      style,
      props: _objectSpread2({}, props),
      attrs: _objectSpread2({}, attrs),
      domProps: _objectSpread2({}, domProps),
      on: _objectSpread2({}, on),
      nativeOn: _objectSpread2({}, nativeOn),
      show,
      directives: directives && [...directives],
      keepAlive
    };
  } // scopedSlots?: { [key: string]: ScopedSlot | undefined };
  // tag?: string;
  // hook?: { [key: string]: Function };
  // transition?: object;
  // inlineTemplate?: {
  //   render: Function;
  //   staticRenderFns: Function[];
  // };


  const InsertView = {
    name: 'InsertView',
    functional: true,

    render(h, {
      parent,
      props,
      data
    }) {
      const {
        name
      } = props;
      const {
        $insertable: insertable
      } = parent;

      if (!insertable) {
        return [];
      }

      const list = insertable.get(name);

      if (!list) {
        return [];
      }

      return list.map(t => h(t, cloneVNodeData(data)));
    }

  };

  let _vue;

  function install(Vue) {
    if (_vue === Vue) {
      return;
    }

    _vue = Vue;
    Object.defineProperty(Vue.prototype, '$insertable', {
      get() {
        if (this.$parent) {
          return this.$parent.$insertable;
        }
      },

      configurable: true
    });
    Vue.component('InsertView', InsertView);
    Vue.mixin({
      beforeCreate() {
        const options = this.$options;

        if (options.insertable) {
          Object.defineProperty(this, '$insertable', {
            value: typeof options.insertable === 'function' ? options.insertable() : options.insertable,
            configurable: true
          });
        }
      }

    });
  }

  class Insertable {
    constructor({
      groups = {}
    } = {}) {
      _defineProperty(this, "groups", Object.create(null));

      _defineProperty(this, "_inited", false);

      for (let k in groups) {
        this.set(k, groups);
      }
    }

    init() {
      if (this._inited) {
        return this.groups;
      }

      if (!_vue) {
        return this.groups;
      }

      this._inited = true;
      const groups = Object.create(null);
      const old = this.groups;

      for (const k in old) {
        _vue.set(groups, k, old[k]);
      }

      this.groups = groups;
      return groups;
    }

    add(name, components, order = 0) {
      const groups = this.init();

      if (!Array.isArray(components)) {
        components = [components];
      }

      const list = groups[name] ? [...groups[name]] : [];
      list.push(...components.map(component => ({
        component,
        order
      })));
      list.sort(({
        order: a
      }, {
        order: b
      }) => a - b);

      if (_vue) {
        _vue.set(groups, name, list);
      } else {
        groups[name] = list;
      }
    }

    remove(name, component, order = 0) {
      const groups = this.init();
      const oldList = groups[name];

      if (!oldList) {
        return;
      }

      if (!component) {
        if (_vue) {
          _vue.set(groups, name, []);
        } else {
          groups[name] = [];
        }

        return;
      }

      const k = oldList.findIndex(t => t.component === component && t.order === order);

      if (k < 0) {
        return;
      }

      const list = [...oldList.slice(0, k), ...oldList.slice(k + 1)];

      if (_vue) {
        _vue.set(groups, name, list);
      } else {
        groups[name] = list;
      }
    }

    set(name, components, order = 0) {
      const groups = this.init();

      if (!Array.isArray(components)) {
        components = [components];
      }

      const list = components.map(component => ({
        component,
        order
      }));

      if (_vue) {
        _vue.set(groups, name, list);
      } else {
        groups[name] = list;
      }
    }

    get(name) {
      const groups = this.init();
      const list = groups[name] || [];
      return list.map(({
        component
      }) => component);
    }

    static get install() {
      return install;
    }

    static get View() {
      return InsertView;
    }

  }

  _defineProperty(Insertable, "version", '0.1.0');

  if (Vue) {
    install(Vue);
  }

  return Insertable;

})));
//# sourceMappingURL=vue-insertable.js.map
