interface Props{
    title: string;
    description?: string;
}

export const CustomHeader = ( {title, description} : Props) => (
    <>
        <h1>{title}</h1>
        <p>{description? description: null}</p>
    </>
);