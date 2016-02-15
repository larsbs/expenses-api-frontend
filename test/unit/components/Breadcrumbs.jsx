import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { Link } from 'react-router';

import Breadcrumbs, { Crumb } from '../../../app/components/Breadcrumbs';


describe('@Breadcrumbs', function () {
  let props;
  let output;
  let renderer;
  beforeEach(function () {
    props = {
      breadcrumbs: [{
        icon: 'fa fa-fw fa-bar-chart',
        title: 'Analytics',
        linkable: true,
        link: '/analytics'
      }, {
        icon: 'fa fa-fw fa-user',
        title: 'User'
      }, {
        title: 'Lorem'
      }]
    };

    renderer = TestUtils.createRenderer();
    renderer.render(
      <Breadcrumbs {...props} />
    );

    output = renderer.getRenderOutput();
  });
  it('should render correctly', function () {
    expect(output.type).to.equal('ul');
    expect(output.props.children.length).to.equal(props.breadcrumbs.length);
    for (const child of output.props.children) {
      expect(child.type).to.equal(Crumb);
    }
  });
  it('should render linkable breadcrumbs with a link child', function () {
    const [ linkableCrumb ] = output.props.children;
    const crumb = props.breadcrumbs[0];

    renderer.render(linkableCrumb);
    const outputCrumb = renderer.getRenderOutput();

    expect(outputCrumb.props.children).to.deep.equal(
      <Link to={crumb.link}>
        <i className={crumb.icon} />
        {crumb.title}
      </Link>
    );
  });
  it('should render non linkable components as text', function () {
    const [ , nonLinkableCrumb ] = output.props.children;
    const crumb = props.breadcrumbs[1];

    renderer.render(nonLinkableCrumb);
    const outputCrumb = renderer.getRenderOutput();

    expect(outputCrumb.props.children[0]).to.deep.equal(<i className={crumb.icon} />);
    expect(outputCrumb.props.children[1]).to.equal(crumb.title);
  });
  it('should not render an icon if not specified', function () {
    const [ , , noIconCrumb ] = output.props.children;
    const crumb = props.breadcrumbs[2];

    renderer.render(noIconCrumb);
    const outputCrumb = renderer.getRenderOutput();

    expect(outputCrumb.props.children[0]).to.be.null;
    expect(outputCrumb.props.children[1]).to.equal(crumb.title);
  });
});
