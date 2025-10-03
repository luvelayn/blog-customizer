import { CSSProperties, useState } from 'react';

import { Article } from 'src/components/article';
import { ArticleParamsForm } from 'src/components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './App.module.scss';

export const App = () => {
	const [articleSettings, setArticleSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const onSubmit = (articleState: ArticleStateType) => {
		setArticleSettings(articleState);
	};

	const onReset = () => {
		setArticleSettings(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleSettings.fontFamilyOption.value,
					'--font-size': articleSettings.fontSizeOption.value,
					'--font-color': articleSettings.fontColor.value,
					'--container-width': articleSettings.contentWidth.value,
					'--bg-color': articleSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={onSubmit} onReset={onReset} />
			<Article />
		</main>
	);
};
