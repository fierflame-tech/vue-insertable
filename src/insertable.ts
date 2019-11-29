import { Component, AsyncComponent } from 'vue';
import install, { Vue } from './install';
import InsertView from './insert-view';

export type InsertableComponent = (string | Component<any, any, any, any> | AsyncComponent<any, any, any, any> | (() => Component));
export interface Info {
	component: InsertableComponent;
	order: number;
}

export interface Options {
	groups?: {[key: string]: InsertableComponent | InsertableComponent[]}
}
class Insertable {
	constructor(options: Options);
	constructor({ groups = {} }: Options = {}) {
		for (let k in groups) {
			this.set(k, groups);
		}
	}
	init(): {[key: string]: Info[]} {
		if (this._inited) { return this.groups; }
		if (!Vue) { return this.groups; }
		this._inited = true;
		const groups = Object.create(null);
		const old = this.groups;
		for (const k in old) {
			Vue.set(groups, k, old[k]);
		}
		this.groups = groups;
		return groups;
	}
	groups: {[key: string]: Info[]} = Object.create(null);
	_inited = false;
	add(name: string, components: InsertableComponent | InsertableComponent[], order = 0) {
		const groups = this.init();
		if (!Array.isArray(components)) { components = [components]; }
		const list = groups[name] ? [...groups[name]] : [];
		list.push(...components.map(component => ({ component, order })));
		list.sort(({order: a}, {order: b}) => a - b);
		if (Vue) {
			Vue.set(groups, name, list);
		} else {
			groups[name] = list;
		}
	}
	remove(name: string): void;
	remove(name: string, component: InsertableComponent, order?: number): void;
	remove(name: string, component?: InsertableComponent, order = 0): void {
		const groups = this.init();
		const oldList = groups[name];
		if (!oldList) { return; }
		if (!component) {
			if (Vue) {
				Vue.set(groups, name, []);
			} else {
				groups[name] = [];
			}
			return;
		}
		const k = oldList.findIndex(t => t.component === component && t.order === order);
		if (k < 0) { return; }
		const list = [...oldList.slice(0, k), ...oldList.slice(k + 1)];
		if (Vue) {
			Vue.set(groups, name, list);
		} else {
			groups[name] = list;
		}
	}
	set(name: string, components: InsertableComponent | InsertableComponent[], order = 0) {
		const groups = this.init();
		if (!Array.isArray(components)) { components = [components]; }
		const list = components.map(component => ({ component, order }));
		if (Vue) {
			Vue.set(groups, name, list);
		} else {
			groups[name] = list;
		}
	}
	get(name: string): InsertableComponent[] {
		const groups = this.init();
		const list = groups[name] || [];
		return list.map(({component}) => component);
	}
	static get install() { return install; };
	static get View() { return InsertView; };
	static readonly version = '__VERSION__';
}
export default Insertable;
