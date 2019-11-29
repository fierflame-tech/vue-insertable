
/*!
 * vue-router v0.0.0
 * (c) 2019 Wang Chenxu
 * @license MIT
 */

import { VueConstructor, CreateElement, RenderContext, VNode, Component, AsyncComponent } from 'vue';

declare function install(Vue: VueConstructor): void;

declare type InsertableComponent = (string | Component<any, any, any, any> | AsyncComponent<any, any, any, any> | (() => Component));
interface Info {
    component: InsertableComponent;
    order: number;
}
interface Options {
    groups?: {
        [key: string]: InsertableComponent | InsertableComponent[];
    };
}
declare class Insertable {
    constructor(options: Options);
    init(): {
        [key: string]: Info[];
    };
    groups: {
        [key: string]: Info[];
    };
    _inited: boolean;
    add(name: string, components: InsertableComponent | InsertableComponent[], order?: number): void;
    remove(name: string): void;
    remove(name: string, component: InsertableComponent, order?: number): void;
    set(name: string, components: InsertableComponent | InsertableComponent[], order?: number): void;
    get(name: string): InsertableComponent[];
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
