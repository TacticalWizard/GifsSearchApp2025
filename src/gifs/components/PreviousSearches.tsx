import type { FC } from "react"; //Another way of using props

interface Props{
    subTitle?: string;
    searches?: string[];
    onLabelClicked: (term: string) => void;
}
 
export const PreviousSearches: FC<Props> = ({ subTitle, searches, onLabelClicked}) => (
    <>
       <div className='previous-searches'>
            <h2>{ subTitle ? subTitle : null }</h2>
            <ul className='previous-searches-list'>
                {searches?.map(( term ) => (
                    <li key= { term } 
                        onClick= { () => onLabelClicked(term) }  
                    >{term} </li>
                ))}
            </ul>
        </div>
    </>
);

