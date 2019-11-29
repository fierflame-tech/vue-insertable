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
			const options = this.$options as {insertable?: Insertable | (() => Insertable)};
			if (options.insertable) {
				Object.defineProperty(this, '$insertable', {
					value: typeof options.insertable === 'function' ? options.insertable() : options.insertable,
					configurable: true,
				});
			}
		},
	});
}
export {
	_vue as Vue,
};
