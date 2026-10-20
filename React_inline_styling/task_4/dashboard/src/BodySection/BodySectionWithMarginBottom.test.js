import React from 'react';
import { shallow } from 'enzyme';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('BodySectionWithMarginBottom', () => {
  it('renders a BodySection and passes the props to it', () => {
    const wrapper = shallow(
      <BodySectionWithMarginBottom title="test title">
        <p>test children node</p>
      </BodySectionWithMarginBottom>
    );

    expect(wrapper.find('div[className^="bodySectionWithMargin"]')).toHaveLength(1);

    const bodySection = wrapper.find(BodySection);
    expect(bodySection).toHaveLength(1);
    expect(bodySection.prop('title')).toBe('test title');

    const inner = bodySection.dive();
    expect(inner.find('h2').text()).toBe('test title');
    expect(inner.find('p').text()).toBe('test children node');
  });
});
