/** @jsx createVNode */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Footer, Header, Navigation, Post, PostForm } from "../../components";
import { createElement, createVNode } from "../../lib";
import { HomePage, LoginPage, NotFoundPage, ProfilePage } from "../../pages";

describe("Chapter1-2 > 기본과제 > 가상돔 만들기 > ", () => {
  describe("createVNode > ", () => {
    it("올바른 구조의 vNode를 생성해야 한다", () => {
      const vNode = createVNode("div", { id: "test" }, "Hello");
      expect(vNode).toEqual({
        type: "div",
        props: { id: "test" },
        children: ["Hello"],
      });
    });

    it("여러 자식을 처리해야 한다", () => {
      const vNode = createVNode("div", null, "Hello", "world");
      expect(vNode.children).toEqual(["Hello", "world"]);
    });

    it("자식 배열을 평탄화해야 한다", () => {
      const vNode = createVNode("div", null, ["Hello", ["world", "!"]]);
      console.log("🚀 ~ it ~ vNode:", vNode.children);
      expect(vNode.children).toEqual(["Hello", "world", "!"]);
    });

    it("중첩 구조를 올바르게 표현해야 한다", () => {
      const vNode = createVNode(
        "div",
        null,
        createVNode("span", null, "Hello"),
        createVNode("b", null, "world")
      );
      expect(vNode.type).toBe("div");
      expect(vNode.children.length).toBe(2);
      expect(vNode.children[0].type).toBe("span");
      expect(vNode.children[1].type).toBe("b");
    });

    it("JSX로 표현한 결과가 createVNode 함수 호출과 동일해야 한다", () => {
      const jsxVNode = (
        <div id="test">
          <span>Hello</span>
          <b>world</b>
        </div>
      );

      expect(jsxVNode).toEqual({
        type: "div",
        props: { id: "test" },
        children: [
          { type: "span", props: null, children: ["Hello"] },
          { type: "b", props: null, children: ["world"] },
        ],
      });
    });
  });

  describe("createElement", () => {
    let container;

    beforeEach(() => {
      container = document.createElement("div");
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it("문자열 입력에 대해 텍스트 노드를 생성해야 한다", () => {
      const result = createElement("Hello");
      expect(result.nodeType).toBe(Node.TEXT_NODE);
      expect(result.textContent).toBe("Hello");
    });

    it("숫자 입력에 대해 텍스트 노드를 생성해야 한다", () => {
      const result = createElement(42);
      expect(result.nodeType).toBe(Node.TEXT_NODE);
      expect(result.textContent).toBe("42");
    });

    it("null 입력에 대해 빈 텍스트 노드를 생성해야 한다", () => {
      const result = createElement(null);
      expect(result.nodeType).toBe(Node.TEXT_NODE);
      expect(result.textContent).toBe("");
    });

    it("false 입력에 대해 빈 텍스트 노드를 생성해야 한다", () => {
      const result = createElement(false);
      expect(result.nodeType).toBe(Node.TEXT_NODE);
      expect(result.textContent).toBe("");
    });

    it("배열 입력에 대해 DocumentFragment를 생성해야 한다", () => {
      const result = createElement([<div>첫 번째</div>, <span>두 번째</span>]);
      expect(result.nodeType).toBe(Node.DOCUMENT_FRAGMENT_NODE);
      expect(result.childNodes.length).toBe(2);
      expect(result.childNodes[0].tagName).toBe("DIV");
      expect(result.childNodes[1].tagName).toBe("SPAN");
    });

    it("함수 컴포넌트를 처리해야 한다", () => {
      const FuncComponent = ({ text }) => <div>{text}</div>;
      const result = createElement(<FuncComponent text="Hello" />);
      expect(result.tagName).toBe("DIV");
      expect(result.textContent).toBe("Hello");
    });

    it("올바른 속성으로 요소를 생성해야 한다", () => {
      const result = createElement(<div id="test" className="sample" />);
      expect(result.tagName).toBe("DIV");
      expect(result.id).toBe("test");
      expect(result.className).toBe("sample");
    });

    it("이벤트 리스너를 연결해야 한다", () => {
      const clickHandler = vi.fn();
      const result = createElement(<button onClick={clickHandler} />);
      result.click();
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    it("중첩된 자식 요소를 올바르게 처리해야 한다", () => {
      const result = createElement(
        <div>
          <span>Hello</span>
          <b>world</b>
        </div>
      );
      expect(result.tagName).toBe("DIV");
      expect(result.childNodes.length).toBe(2);
      expect(result.childNodes[0].tagName).toBe("SPAN");
      expect(result.childNodes[1].tagName).toBe("B");
    });

    it("깊게 중첩된 구조를 처리해야 한다", () => {
      const result = createElement(
        <div>
          <span>
            <a href="#">링크</a>
            <b>굵게</b>
          </span>
          <p>문단</p>
        </div>
      );
      expect(result.tagName).toBe("DIV");
      expect(result.childNodes.length).toBe(2);
      expect(result.childNodes[0].tagName).toBe("SPAN");
      expect(result.childNodes[0].childNodes.length).toBe(2);
      expect(result.childNodes[0].childNodes[0].tagName).toBe("A");
      expect(result.childNodes[0].childNodes[1].tagName).toBe("B");
      expect(result.childNodes[1].tagName).toBe("P");
    });

    it("혼합 콘텐츠(텍스트와 요소)를 처리해야 한다", () => {
      const result = createElement(
        <div>
          텍스트
          <span>span 안의 텍스트</span>더 많은 텍스트
        </div>
      );
      expect(result.tagName).toBe("DIV");
      expect(result.childNodes.length).toBe(3);
      expect(result.childNodes[0].nodeType).toBe(Node.TEXT_NODE);
      expect(result.childNodes[1].tagName).toBe("SPAN");
      expect(result.childNodes[2].nodeType).toBe(Node.TEXT_NODE);
    });

    it("빈 자식 배열을 처리해야 한다", () => {
      const result = createElement(<div>{[]}</div>);
      expect(result.tagName).toBe("DIV");
      expect(result.childNodes.length).toBe(0);
    });

    it("undefined 자식을 무시해야 한다", () => {
      const result = createElement(<div>{undefined}</div>);
      expect(result.tagName).toBe("DIV");
      expect(result.childNodes.length).toBe(0);
    });

    it("불리언 속성을 처리해야 한다", () => {
      const result = createElement(<input disabled={true} />);
      expect(result.tagName).toBe("INPUT");
      expect(result.disabled).toBe(true);
    });

    it("데이터 속성을 처리해야 한다", () => {
      const result = createElement(<div data-test="값" />);
      expect(result.tagName).toBe("DIV");
      expect(result.dataset.test).toBe("값");
    });
  });

  describe("컴포넌트를 jsx로 정의하여 사용했는지 확인하기", () => {
    it("Post >", () => {
      expect(<Post />).toEqual({ type: Post, props: null, children: [] });
    });

    it("PostForm >", () => {
      const fn = vi.fn();
      expect(<PostForm onSubmit={fn} />).toEqual({
        type: PostForm,
        props: { onSubmit: fn },
        children: [],
      });
    });

    it("Header >", () => {
      expect(<Header />).toEqual({ type: Header, props: null, children: [] });
    });

    it("Navigation >", () => {
      expect(<Navigation loggedIn />).toEqual({
        type: Navigation,
        props: { loggedIn: true },
        children: [],
      });
      expect(<Navigation loggedIn={false} />).toEqual({
        type: Navigation,
        props: { loggedIn: false },
        children: [],
      });
    });

    it("Footer >", () => {
      expect(<Footer />).toEqual({ type: Footer, props: null, children: [] });
    });

    it("HomePage >", () => {
      expect(<HomePage />).toEqual({
        type: HomePage,
        props: null,
        children: [],
      });
    });

    it("LoginPage >", () => {
      expect(<LoginPage />).toEqual({
        type: LoginPage,
        props: null,
        children: [],
      });
    });

    it("NotFoundPage >", () => {
      expect(<NotFoundPage />).toEqual({
        type: NotFoundPage,
        props: null,
        children: [],
      });
    });

    it("ProfilePage >", () => {
      expect(<ProfilePage />).toEqual({
        type: ProfilePage,
        props: null,
        children: [],
      });
    });

    it("HomePage를 렌더링 했을 때 html 문자열로 잘 변환되는지 확인", () => {
      expect(createElement(<HomePage />).innerHTML).toBe(
        `<div class="max-w-md w-full"><header class="bg-blue-600 text-white p-4 sticky top-0"><h1 class="text-2xl font-bold">항해플러스</h1></header><nav class="bg-white shadow-md p-2 sticky top-14"><ul class="flex justify-around"><li><a href="/" class="text-blue-600 font-bold" data-link="true">홈</a></li><li><a href="/login" class="text-gray-600" data-link="true">로그인</a></li></ul></nav><main class="p-4"><div id="posts-container" class="space-y-4"><div class="bg-white rounded-lg shadow p-4 mb-4"><div class="flex items-center mb-2"><img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2"><div><div class="font-bold">홍길동</div><div class="text-gray-500 text-sm">5분 전</div></div></div><p>오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!</p><div class="mt-2 flex justify-between text-gray-500"><span class="like-button" data-post-id="1">좋아요</span><span>댓글</span><span>공유</span></div></div><div class="bg-white rounded-lg shadow p-4 mb-4"><div class="flex items-center mb-2"><img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2"><div><div class="font-bold">김철수</div><div class="text-gray-500 text-sm">15분 전</div></div></div><p>새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!</p><div class="mt-2 flex justify-between text-gray-500"><span class="like-button" data-post-id="2">좋아요</span><span>댓글</span><span>공유</span></div></div><div class="bg-white rounded-lg shadow p-4 mb-4"><div class="flex items-center mb-2"><img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2"><div><div class="font-bold">이영희</div><div class="text-gray-500 text-sm">30분 전</div></div></div><p>오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?</p><div class="mt-2 flex justify-between text-gray-500"><span class="like-button" data-post-id="3">좋아요</span><span>댓글</span><span>공유</span></div></div><div class="bg-white rounded-lg shadow p-4 mb-4"><div class="flex items-center mb-2"><img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2"><div><div class="font-bold">박민수</div><div class="text-gray-500 text-sm">1시간 전</div></div></div><p>주말에 등산 가실 분 계신가요? 함께 가요!</p><div class="mt-2 flex justify-between text-gray-500"><span class="like-button" data-post-id="4">좋아요</span><span>댓글</span><span>공유</span></div></div><div class="bg-white rounded-lg shadow p-4 mb-4"><div class="flex items-center mb-2"><img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2"><div><div class="font-bold">정수연</div><div class="text-gray-500 text-sm">2시간 전</div></div></div><p>새로 나온 영화 재미있대요. 같이 보러 갈 사람?</p><div class="mt-2 flex justify-between text-gray-500"><span class="like-button" data-post-id="5">좋아요</span><span>댓글</span><span>공유</span></div></div></div></main><footer class="bg-gray-200 p-4 text-center"><p>© 2024 항해플러스. All rights reserved.</p></footer></div>`
      );
    });
  });
});
