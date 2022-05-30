import * as C from './styles';
type Props = {
    label : string;
    value : string;
}

export const InfoItem = ({label, value} : Props) =>{
    return(
        <C.Container>
            <C.label>{label}</C.label>
            <C.value>{value}</C.value>
        </C.Container>
    );
}