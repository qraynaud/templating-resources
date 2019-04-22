import {inject} from 'aurelia-dependency-injection';
import {BoundViewFactory, ViewSlot, customAttribute, templateController, ViewFactory, View} from 'aurelia-templating';

/**
 * Marks any part of a view to be replacable by the consumer.
 */
@customAttribute('replaceable')
@templateController
@inject(BoundViewFactory, ViewSlot)
export class Replaceable {

  /**@internal*/
  viewFactory: ViewFactory;
  /**@internal*/
  viewSlot: ViewSlot;
  /**@internal*/
  view: View;

  /**
   * @param viewFactory target The factory generating the view.
   * @param viewSlot viewSlot The slot the view is injected in to.
   */
  constructor(viewFactory: ViewFactory, viewSlot: ViewSlot) {
    this.viewFactory = viewFactory; //This is referenced internally in the Controller's bind method.
    this.viewSlot = viewSlot;
    this.view = null;
  }

  /**
   * Binds the replaceable to the binding context and override context.
   * @param bindingContext The binding context.
   * @param overrideContext An override context for binding.
   */
  bind(bindingContext, overrideContext) {
    if (this.view === null) {
      this.view = (this.viewFactory as any).create();
      this.viewSlot.add(this.view);
    }

    this.view.bind(bindingContext, overrideContext);
  }

  /**
   * Unbinds the replaceable.
   */
  unbind() {
    this.view.unbind();
  }
}
