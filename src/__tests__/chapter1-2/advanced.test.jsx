/** @jsx createVNode */
/** @jsxFrag Fragment */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createVNode, renderElement } from '../../lib';

describe('Chapter1-2 > 심화과제 > Virtual DOM과 이벤트 관리', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('renderElement > ', () => {
    it('초기 렌더링이 올바르게 수행되어야 한다', () => {
      const vNode = <div id="test">Hello</div>;
      renderElement(vNode, container);
      expect(container.innerHTML).toBe('<div id="test">Hello</div>');
    });

    it('diff 알고리즘을 통해 변경된 부분만 업데이트해야 한다', () => {
      const initialVNode = (
        <div>
          <h1>Title</h1>
          <p>Paragraph 1</p>
        </div>
      );
      renderElement(initialVNode, container);

      const originalH1 = container.querySelector('h1');
      const originalP = container.querySelector('p');

      const updatedVNode = (
        <div>
          <h1>Updated Title</h1>
          <p>Paragraph 1</p>
        </div>
      );
      renderElement(updatedVNode, container);

      expect(container.innerHTML).toBe('<div><h1>Updated Title</h1><p>Paragraph 1</p></div>');
      expect(container.querySelector('h1')).toBe(originalH1); // 같은 요소 참조 확인
      expect(container.querySelector('p')).toBe(originalP); // 같은 요소 참조 확인
      expect(container.querySelector('h1').textContent).toBe('Updated Title');
      expect(container.querySelector('p').textContent).toBe('Paragraph 1');
    });

    it('새로운 요소를 추가하고 불필요한 요소를 제거해야 한다', () => {
      const initialVNode = (
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      );
      renderElement(initialVNode, container);

      const originalFirstLi = container.querySelector('li:first-child');

      const updatedVNode = (
        <ul>
          <li>Item 1</li>
          <li>New Item</li>
          <li>Item 3</li>
        </ul>
      );
      renderElement(updatedVNode, container);

      expect(container.querySelectorAll('li').length).toBe(3);
      expect(container.querySelector('li:nth-child(2)').textContent).toBe('New Item');
      expect(container.querySelector('li:first-child')).toBe(originalFirstLi); // 같은 요소 참조 확인
    });

    it('요소의 속성만 변경되었을 때 요소를 재사용해야 한다', () => {
      const initialVNode = <div id="test" className="old">Hello</div>;
      renderElement(initialVNode, container);

      const originalDiv = container.querySelector('div');

      const updatedVNode = <div id="test" className="new">Hello</div>;
      renderElement(updatedVNode, container);

      expect(container.innerHTML).toBe('<div id="test" class="new">Hello</div>');
      expect(container.querySelector('div')).toBe(originalDiv); // 같은 요소 참조 확인
    });

    it('요소의 타입이 변경되었을 때 새로운 요소를 생성해야 한다', () => {
      const initialVNode = <div>Hello</div>;
      renderElement(initialVNode, container);

      const originalElement = container.firstChild;

      const updatedVNode = <span>Hello</span>;
      renderElement(updatedVNode, container);

      expect(container.innerHTML).toBe('<span>Hello</span>');
      expect(container.firstChild).not.toBe(originalElement); // 다른 요소 참조 확인
    });
  });

  describe('이벤트 관리 > ', () => {
    it('이벤트가 위임 방식으로 등록되어야 한다', () => {
      const clickHandler = vi.fn();
      const vNode = (
        <div>
          <button onClick={clickHandler}>Click me</button>
        </div>
      );
      renderElement(vNode, container);

      const button = container.querySelector('button');
      button.click();

      expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    it('동적으로 추가된 요소에도 이벤트가 정상적으로 작동해야 한다', () => {
      const clickHandler = vi.fn();
      const initialVNode = (
        <div>
          <button onClick={clickHandler}>Initial Button</button>
        </div>
      );
      renderElement(initialVNode, container);

      const updatedVNode = (
        <div>
          <button onClick={clickHandler}>Initial Button</button>
          <button onClick={clickHandler}>New Button</button>
        </div>
      );
      renderElement(updatedVNode, container);

      const newButton = container.querySelectorAll('button')[1];
      newButton.click();

      expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    it('이벤트 핸들러가 제거되면 더 이상 호출되지 않아야 한다', () => {
      const clickHandler = vi.fn();
      const initialVNode = (
        <div>
          <button onClick={clickHandler}>Button</button>
        </div>
      );
      renderElement(initialVNode, container);

      const updatedVNode = (
        <div>
          <button>Button Without Handler</button>
        </div>
      );
      renderElement(updatedVNode, container);

      const button = container.querySelector('button');
      button.click();

      expect(clickHandler).not.toHaveBeenCalled();
    });
  });
});
