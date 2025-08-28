import { CSSProperties, useState } from "react";
import { defaultArticleState } from "src/constants/articleProps";
import { ArticleParamsForm } from "../article-params-form/ArticleParamsForm";
import { Article } from "../article/Article";
import styles from "./App.module.scss"

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

  const updateArticleState = (newState: typeof defaultArticleState) => {
    setArticleState(newState);
  };
	return (
		<main
			className={styles.main}
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
				articleState={articleState}	
				onStateChange={updateArticleState} 
			/>
			<Article />
		</main>
	);
};