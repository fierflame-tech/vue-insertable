import { VueConstructor } from 'vue';
import Insertable from './insertable';
import InsertView from './insert-view';
let _vue: VueConstructor | undefined;
export default function install(Vue: VueConstructor) {
	if (_vue === Vue) { return; }
	_vue = Vue;
	Object.defineProperty(Vue.prototype, '$insertable', {
		get() { if (this.$parent) { return this.$parent.$insertable; } },
		configurable: true,
	});
	Vue.component('InsertView', InsertView);
	Vue.mixin({
		beforeCreate(this: VueConstructor['prototype'] & {$insertable?: Insertable, $parent: {$insertable?: Insertable}}) {
			const options = this.$options as {insertable?: Insertable | ((parent?: Insertable) => Insertable)};
			let insertable =  options.insertable;
			if (typeof insertable === 'function') {
				insertable = insertable(this.$parent && this.$parent.$insertable);
			}
			if (insertable instanceof Insertable) {
				Object.defineProperty(this, '$insertable', {
					value: insertable,
					configurable: true,
				});
			}
		},
	});
}
export {
	_vue as Vue,
};
