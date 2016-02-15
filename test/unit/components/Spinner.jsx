import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import Spinner from '../../../app/components/Spinner';


describe('@Spinner', function () {
  let props;
  let output;
  let renderer;
  beforeEach(function () {
    props = {
      width: 20,
      height: 20,
      borderRadius: 5
    };

    renderer = TestUtils.createRenderer();
    renderer.render(<Spinner {...props} />);

    output = renderer.getRenderOutput();
  });
  it('should render correctly', function () {
    expect(output.type).to.equal('div');
    expect(output.props.children.length).to.equal(9);
    expect(output.props.style).to.deep.equal({ width: props.width, height: props.height });
  });
  it('should assign borderProperty props correctly to first and last children', function () {
    expect(output.props.children[0].props.style).to.deep.equal({ borderTopLeftRadius: props.borderRadius });
    expect(output.props.children[8].props.style).to.deep.equal({ borderBottomRightRadius: props.borderRadius });
  });
});
