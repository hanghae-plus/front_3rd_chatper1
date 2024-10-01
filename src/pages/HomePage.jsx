/** @jsx createVNode */
import { createVNode } from '../lib';
import { DefaultLayout } from '../layouts';

export const HomePage = () => {
  return (
    <DefaultLayout>
      <main class="p-4">
        <div id="posts-container" class="space-y-4">
          <div class="bg-white rounded-lg shadow p-4 mb-4">
            <div class="flex items-center mb-2">
              <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2" />
              <div>
                <div class="font-bold">홍길동</div>
                <div class="text-gray-500 text-sm">5분 전</div>
              </div>
            </div>
            <p>오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <span class="like-button" data-post-id="1">
                좋아요
              </span>
              <span>댓글</span>
              <span>공유</span>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow p-4 mb-4">
            <div class="flex items-center mb-2">
              <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2" />
              <div>
                <div class="font-bold">김철수</div>
                <div class="text-gray-500 text-sm">15분 전</div>
              </div>
            </div>
            <p>새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <span class="like-button" data-post-id="2">
                좋아요
              </span>
              <span>댓글</span>
              <span>공유</span>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow p-4 mb-4">
            <div class="flex items-center mb-2">
              <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2" />
              <div>
                <div class="font-bold">이영희</div>
                <div class="text-gray-500 text-sm">30분 전</div>
              </div>
            </div>
            <p>오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <span class="like-button" data-post-id="3">
                좋아요
              </span>
              <span>댓글</span>
              <span>공유</span>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow p-4 mb-4">
            <div class="flex items-center mb-2">
              <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2" />
              <div>
                <div class="font-bold">박민수</div>
                <div class="text-gray-500 text-sm">1시간 전</div>
              </div>
            </div>
            <p>주말에 등산 가실 분 계신가요? 함께 가요!</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <span class="like-button" data-post-id="4">
                좋아요
              </span>
              <span>댓글</span>
              <span>공유</span>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow p-4 mb-4">
            <div class="flex items-center mb-2">
              <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2" />
              <div>
                <div class="font-bold">정수연</div>
                <div class="text-gray-500 text-sm">2시간 전</div>
              </div>
            </div>
            <p>새로 나온 영화 재미있대요. 같이 보러 갈 사람?</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <span class="like-button" data-post-id="5">
                좋아요
              </span>
              <span>댓글</span>
              <span>공유</span>
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};
