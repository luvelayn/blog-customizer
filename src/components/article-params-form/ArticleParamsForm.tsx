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
	onSubmit: (articleState: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	onSubmit,
	onReset,
}: ArticleParamsFormProps) => {
	const root = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useState(false);
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(defaultArticleState);

	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (event: MouseEvent) => {
			const target = event.target;
			if (target instanceof Node && !root.current?.contains(target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen]);

	const onToggle = () => {
		setIsOpen((prevState) => !prevState);
	};

	const handleChange = (
		optionName: keyof ArticleStateType,
		option: OptionType
	) => {
		setFormSettings({
			...formSettings,
			[optionName]: option,
		});
	};

	const handleReset = () => {
		setFormSettings(defaultArticleState);
		onReset();
		setIsOpen(false);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(formSettings);
		setIsOpen(false);
	};

	return (
		<div ref={root}>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						title={'Шрифт'}
						options={fontFamilyOptions}
						selected={formSettings.fontFamilyOption}
						onChange={(option: OptionType) => {
							handleChange('fontFamilyOption', option);
						}}
					/>
					<RadioGroup
						title={'Размер шрифта'}
						name={'font-size'}
						options={fontSizeOptions}
						selected={formSettings.fontSizeOption}
						onChange={(option: OptionType) => {
							handleChange('fontSizeOption', option);
						}}
					/>
					<Select
						title={'Цвет шрифта'}
						options={fontColors}
						selected={formSettings.fontColor}
						onChange={(option: OptionType) => {
							handleChange('fontColor', option);
						}}
					/>
					<Separator />
					<Select
						title={'Цвет фона'}
						options={backgroundColors}
						selected={formSettings.backgroundColor}
						onChange={(option: OptionType) => {
							handleChange('backgroundColor', option);
						}}
					/>
					<Select
						title={'Ширина контента'}
						options={contentWidthArr}
						selected={formSettings.contentWidth}
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
