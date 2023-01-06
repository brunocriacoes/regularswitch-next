import React from "react";
import HeaderComponents from "../../components/HeaderComponents";
import FooterComponents from "../../components/FooterComponents";
import Image from 'next/image'
import Language from "../../components/Language";

export default function ProjectBySlug({ allPosts, lang }: any) {
	return (
		<div>
			<HeaderComponents lang={lang} />
			{allPosts.map((p: any) => (
				<div key={p.id}>
					<div className="fixed top-0 left-0 w-[100vw] z-[-1] h-[100vh]">
						<Image
							alt={p.title}
							src={p.image_full}
							layout="fill"
							objectFit="cover"
						/>
					</div>

					<h1 className="text-white">{p.title}</h1>
					<div dangerouslySetInnerHTML={{ __html: p.content }} />
				</div>
			))}
			<FooterComponents />
		</div>
	);
}

type paths = {
	slug?: string
}

export async function getStaticPaths() {
	// let products: paths[];
	// products = []
	// const paths = products.map(category => {
	// 	return { params: { slug: category.slug } }
	// })
	return {
		paths: [],
		fallback: 'blocking'
	}
}

export async function getStaticProps(req: any) {
	const { slug } = req.params;
	let base = process.env?.BASE
	let url = base + "/api/project/" + slug
	let allPosts = []
	let lang = Language(req)
	try {
		let requestPosts = await fetch(url)
		allPosts = await requestPosts.json()
	} catch (error) { }
	return {
		props: {
			allPosts,
			lang
		},
		revalidate: 10
	}
}