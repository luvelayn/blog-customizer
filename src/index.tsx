import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';

import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import clsx from 'clsx';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const toggleSidebar = () => {
		setIsSidebarOpen((prevState) => !prevState);
	};

	const handleSubmit = (articleState: ArticleStateType) => {
		setArticleState(articleState);
		setIsSidebarOpen(false);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		setIsSidebarOpen(false);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onToggle={toggleSidebar}
				onSubmit={handleSubmit}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
