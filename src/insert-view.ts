import { RenderContext, VNode, CreateElement, VNodeData } from 'vue';
import Insertable from './insertable';
function cloneVNodeData(data: VNodeData): VNodeData {
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
		keepAlive,
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
		props: { ...props},
		attrs: { ...attrs},
		domProps: { ...domProps},
		on: { ...on},
		nativeOn: { ...nativeOn},
		show,
		directives: directives && [...directives],
		keepAlive,
	}
}

// scopedSlots?: { [key: string]: ScopedSlot | undefined };
// tag?: string;
// hook?: { [key: string]: Function };
// transition?: object;
// inlineTemplate?: {
//   render: Function;
//   staticRenderFns: Function[];
// };

const InsertView = ({
	name: 'InsertView',
	functional: true,
	render(
		h: CreateElement,
		{ parent, props, data }: RenderContext<{ name: string; }> & { parent: {$insertable?: Insertable} }
	): VNode[] {
		const { name } = props;
		const { $insertable: insertable } = parent;
		if (!insertable){ return []; }
		const list = insertable.get(name);
		if (!list) { return []; }
		return list.map(t => h(t, cloneVNodeData(data)));
	},
});


export default InsertView;
