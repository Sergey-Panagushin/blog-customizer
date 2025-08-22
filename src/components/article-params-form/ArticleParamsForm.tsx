import { ArrowButton } from 'src/ui/arrow-button';
import { FC, useEffect } from 'react';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import { RadioGroup } from 'src/ui/radio-group'; 
import { Separator } from 'src/ui/separator';
import { fontFamilyOptions, OptionType, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, defaultArticleState } from 'src/constants/articleProps';

interface ArticleParamsFormProps {
  articleState: typeof defaultArticleState;
  onStateChange: (newState: typeof defaultArticleState) => void;
}

export const ArticleParamsForm: FC<ArticleParamsFormProps> = ({
  articleState,
  onStateChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState<OptionType>(articleState.fontFamilyOption);
  const [selectedSize, setSelectedSize] = useState<OptionType>(articleState.fontSizeOption);
  const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(articleState.fontColor);
  const [selectedBgColor, setSelectedBgColor] = useState<OptionType>(articleState.backgroundColor);
  const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(articleState.contentWidth);

  const buttonApply = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newState = {
      fontFamilyOption: selectedFont,
      fontColor: selectedFontColor,
      backgroundColor: selectedBgColor,
      contentWidth: selectedContentWidth,
      fontSizeOption: selectedSize,
    };
    
    onStateChange(newState); 
  };

  const handleReset = () => {
    setSelectedFont(articleState.fontFamilyOption);
    setSelectedSize(articleState.fontSizeOption);
    setSelectedFontColor(articleState.fontColor);
    setSelectedBgColor(articleState.backgroundColor);
    setSelectedContentWidth(articleState.contentWidth);
    onStateChange(defaultArticleState); 
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

	const handleFontFamily = (newFont: OptionType) => {
		setSelectedFont(newFont)
	}

	const handleSize = (sizeValue:OptionType) => { 
		setSelectedSize(sizeValue);
	};

	const handleFontColor = (color:OptionType) => { 
		setSelectedFontColor(color);
	};

	const handleBgColor = (color:OptionType) => { 
		setSelectedBgColor(color);
	};

	const handleContentWidth = (width:OptionType) => { 
		setSelectedContentWidth(width);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside className={clsx(styles.container,{ [styles.container_open]: isOpen })}
			onClick={(e) => e.stopPropagation()}>
				
				<form className={styles.form} >
					<h2 className={clsx(styles.title)}>Задайте параметры</h2>
					<Select 
						selected={selectedFont} 
						options={fontFamilyOptions}
						title="Шрифт"
						onChange={handleFontFamily}
					/>
					<RadioGroup
						name = "fontSize"
						options = {fontSizeOptions}
						selected = {selectedSize}
						onChange = {handleSize}
						title = "Размер шрифта"
					/>
					<Select 
						selected={selectedFontColor} 
						options={fontColors}
						title="Цвет шрифта"
						onChange={handleFontColor}
					/>
					<Separator/>
					<Select 
						selected={selectedBgColor} 
						options={backgroundColors}
						title="Цвет фона"
						onChange={handleBgColor}
					/>
					<Select 
						selected={selectedContentWidth} 
						options={contentWidthArr}
						title="Ширина контента"
						onChange={handleContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={handleReset} />
						<Button title='Применить' htmlType='submit' type='apply' onClick={buttonApply}/>
					</div>
				</form>
			</aside>
		</>
	);
};
