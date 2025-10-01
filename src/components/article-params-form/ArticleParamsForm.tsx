import { useRef, useEffect, useState } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	onSubmit: (articleState: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	onSubmit,
	onReset,
}: ArticleParamsFormProps) => {
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [formParams, setFormParams] =
		useState<ArticleStateType>(defaultArticleState);

	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (event: MouseEvent) => {
			const target = event.target;
			if (target instanceof Node && !sidebarRef.current?.contains(target)) {
				onToggle();
			}
		};

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen]);

	const handleChange = (
		optionName: keyof ArticleStateType,
		option: OptionType
	) => {
		setFormParams({
			...formParams,
			[optionName]: option,
		});
	};

	const handleReset = () => {
		setFormParams(defaultArticleState);
		onReset();
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(formParams);
	};

	return (
		<div ref={sidebarRef}>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						title={'Шрифт'}
						options={fontFamilyOptions}
						selected={formParams.fontFamilyOption}
						onChange={(option: OptionType) => {
							handleChange('fontFamilyOption', option);
						}}
					/>
					<RadioGroup
						title={'Размер шрифта'}
						name={'font-size'}
						options={fontSizeOptions}
						selected={formParams.fontSizeOption}
						onChange={(option: OptionType) => {
							handleChange('fontSizeOption', option);
						}}
					/>
					<Select
						title={'Цвет шрифта'}
						options={fontColors}
						selected={formParams.fontColor}
						onChange={(option: OptionType) => {
							handleChange('fontColor', option);
						}}
					/>
					<Separator />
					<Select
						title={'Цвет фона'}
						options={backgroundColors}
						selected={formParams.backgroundColor}
						onChange={(option: OptionType) => {
							handleChange('backgroundColor', option);
						}}
					/>
					<Select
						title={'Ширина контента'}
						options={contentWidthArr}
						selected={formParams.contentWidth}
						onChange={(option: OptionType) => {
							handleChange('contentWidth', option);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
