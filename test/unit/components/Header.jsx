import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import Header from '../../../app/components/Header';
import Breadcrumbs from '../../../app/components/Breadcrumbs';


describe('@Header', function () {
  let props;
  let output;
  let renderer;
  beforeEach(function () {
    props = {
      breadcrumbs: [{
        icon: 'fa fa-fw fa-bar-chart',
        title: 'Analytics'
      }]
    };

    renderer = TestUtils.createRenderer();
    renderer.render(
      <Header {...props} >
        <button>Hello</button>
      </Header>
    );

    output = renderer.getRenderOutput();
  });
  it('should render correctly', function () {
    expect(output.type).to.equal('div');
    expect(output.props.children.length).to.equal(2);

    const [ breadcrumbs, buttonsContainer ] = output.props.children;

    expect(breadcrumbs.type).to.be.equal(Breadcrumbs);
    expect(buttonsContainer.type).to.be.equal('div');
  });
  it('should forward the breadcrumbs props to the Breadcrumbs component', function () {
    const [ breadcrumbs ] = output.props.children;
    expect(breadcrumbs.props.breadcrumbs).to.deep.equal(props.breadcrumbs);
  });
  it('should render the received buttons as children of buttonsContainer', function () {
    const [ , buttonsContainer ] = output.props.children;
    expect(buttonsContainer.props.children).to.deep.equal(<button>Hello</button>);
  });
});
