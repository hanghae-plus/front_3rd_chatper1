/** @jsx createVNode */
import { Header, Navigation, Post, PostForm, Footer } from "../components";
import { createVNode } from "../lib";
import { globalStore } from "../stores";
import { NotFoundPage } from "./";

export const HomePage = () => {
	const { loggedIn, posts } = globalStore.getState();

	return (
		<div class="max-w-md w-full">
			<div class="max-w-md w-full">
				{Header()}
				{Navigation({ loggedIn })}
				<main class="p-4">
					{loggedIn ? NotFoundPage() : ""}
					<div id="posts-container" class="space-y-4">
						{posts.map(Post)}
					</div>
				</main>
				{Footer()}
			</div>
		</div>
	);
};
