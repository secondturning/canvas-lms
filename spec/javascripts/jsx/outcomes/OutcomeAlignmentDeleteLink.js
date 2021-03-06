define([
  'jquery',
  'jsx/outcomes/OutcomeAlignmentDeleteLink',
  'react',
  'react-dom',
  'enzyme'
], ($, OutcomeAlignmentDeleteLink, React, ReactDOM, Enzyme) => {
  const { mount } = Enzyme;
  QUnit.module('OutcomeAlignmentDeleteLink');

  test('should render span if hasRubricAssociation', () => {
    const wrapper = mount(<OutcomeAlignmentDeleteLink url="http://hellow" has_rubric_association="" />);
    const span = wrapper.find('span');
    ok(span.exists());
  });

  test('should render a link if !hasRubricAssociation', () => {
    const wrapper = mount(<OutcomeAlignmentDeleteLink url="http://hellow" />);
    const span = wrapper.find('a');
    ok(span.exists());
  });
});
