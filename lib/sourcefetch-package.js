'use babel';

import SourcefetchPackageView from './sourcefetch-package-view';
import { CompositeDisposable } from 'atom';

export default {

  sourcefetchPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.sourcefetchPackageView = new SourcefetchPackageView(state.sourcefetchPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.sourcefetchPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'sourcefetch-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.sourcefetchPackageView.destroy();
  },

  serialize() {
    return {
      sourcefetchPackageViewState: this.sourcefetchPackageView.serialize()
    };
  },

  toggle() {
    console.log('SourcefetchPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
