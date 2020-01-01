
/*!
 * vue-insertable v0.1.1
 * (c) 2019-2020 Fierflame
 * @license MIT
 */

import { VueConstructor, CreateElement, RenderContext, VNode, Component, AsyncComponent } from 'vue';

declare function install(Vue: VueConstructor): void;

declare type InsertableComponent = (string | Component<any, any, any, any> | AsyncComponent<any, any, any, any> | (() => Component));
interface Options {
    groups?: {
        [key: string]: InsertableComponent | InsertableComponent[];
    };
}
declare class Insertable {
    private _inited;
    readonly parent?: Insertable;
    private _groups;
    constructor(options?: Options);
    constructor(parent: Insertable, options?: Options);
    private init;
    add(name: string, components: InsertableComponent | InsertableComponent[], order?: number): void;
    remove(name: string): void;
    remove(name: string, component: InsertableComponent, order?: number): void;
    set(name: string, components: InsertableComponent | InsertableComponent[], order?: number): void;
    private _getInfo;
    get(name: string, noParentList?: boolean): InsertableComponent[];
    static get install(): typeof install;
    static get View(): {
        name: string;
        functional: boolean;
        render(h: CreateElement, { parent, props, data }: RenderContext<{
            name: string;
        }> & {
            parent: {
                $insertable?: Insertable | undefined;
            };
        }): VNode[];
    };
    static readonly version = "__VERSION__";
}

export default Insertable;
