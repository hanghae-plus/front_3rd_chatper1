const ProfilePage = () => {
	return /* HTML */ ` <div class="bg-gray-100 min-h-screen flex justify-center">
		<div class="max-w-md w-full">
			<header class="bg-blue-600 text-white p-4 sticky top-0">
				<h1 class="text-2xl font-bold">항해플러스</h1>
			</header>

			<nav class="bg-white shadow-md p-2 sticky top-14">
				<ul class="flex justify-around">
					<li>
						<a href="/" class="text-gray-600"> 홈 </a>
					</li>
					<li>
						<a href="/profile" class="text-blue-600"> 프로필 </a>
					</li>
					<li>
						<button id="logout" class="text-gray-600">로그아웃</button>
					</li>
				</ul>
			</nav>

			<main class="p-4">
				<div class="bg-white p-8 rounded-lg shadow-md">
					<h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
					<form id="profile-form">
						<div class="mb-4">
							<label for="username" class="block text-gray-700 text-sm font-bold mb-2">
								사용자 이름
							</label>
							<input type="text" id="username" name="username" class="w-full p-2 border rounded" />
						</div>
						<div class="mb-4">
							<label for="email" class="block text-gray-700 text-sm font-bold mb-2"> 이메일 </label>
							<input type="email" id="email" name="email" class="w-full p-2 border rounded" />
						</div>
						<div class="mb-6">
							<label for="bio" class="block text-gray-700 text-sm font-bold mb-2"> 자기소개 </label>
							<textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded"></textarea>
						</div>
						<button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">
							프로필 업데이트
						</button>
					</form>
				</div>
			</main>

			<footer class="bg-gray-200 p-4 text-center">
				<p>&copy; 2024 항해플러스. All rights reserved.</p>
			</footer>
		</div>
	</div>`;
};

export default ProfilePage();
