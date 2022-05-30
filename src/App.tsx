import { useEffect,useState } from 'react';
import * as C from './App.styles';
import logoImage from './assets/devmemory_logo.png';
import { InfoItem } from './components/InfoItem';
import { Button} from './components/Button';
import { GridItem } from './components/GridItem';

import RestartIcon from './svgs/restart.svg';
import { GridItemType} from './types/GridItemType';
import {items} from  './data/items';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';
import { tmpdir } from 'os';


const App = () =>  {
  const[playing,setPlaying] = useState<boolean>(false);
  const[timeelapsed, setTimeElapsed] = useState<number>(0);
  const[moveCount,setMoveCount]= useState<number>(0);
  const[shownCount,setShownCount]= useState<number>(0);
  const[gridItems,setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(()=>{
    if (moveCount >0 && gridItems.every(item => item.permanentShown)){
      setPlaying(false);
    }
  },[moveCount,gridItems]);
  useEffect(()=> {
    const timer=setInterval(()=>{
      if (playing) {
        setTimeElapsed(timeelapsed+1);
      }
    },1000);
    return() => clearTimeout(timer);
  },[playing,timeelapsed]);

  //verificar se os abertos são iguais
  useEffect(()=>{
    if(shownCount===2){
      let opened = gridItems.filter(item => item.shown ===true);
      if (opened.length === 2) {
        setTimeout(() => {
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid){
            if (! tmpGrid[i].permanentShown ){
              tmpGrid[i].permanentShown = (opened[0].item ===opened[1].item && opened[0].item ===tmpGrid[i].item);
            };
            tmpGrid[i].shown = false;
            }
          setGridItems(tmpGrid);
          setShownCount(0);
          setMoveCount(moveCount + 1);          
        }, 1000);

      }
    }
  },[shownCount,gridItems]);

  const handleItemClick = (index : number) =>{
    if(playing && index !== null && shownCount < 2){
      let tempGrid = [...gridItems];
      if (!tempGrid[index].permanentShown && !tempGrid[index].shown){
        tempGrid[index].shown = true;
        setShownCount(shownCount+1);  
      }
      setGridItems(tempGrid)
    }  
  }

  const resetAndCreateGrid = () =>{
    //reset
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);
        
    //cria o grid 
    let tempGrid : GridItemType[] = [];
    for(let i = 0; i<(items.length * 2); i++){
      tempGrid.push({item: null, shown: false, permanentShown : false});
    }
    //o for da linha de cima equiale a:
    //for(let i = 0; i<(items.length * 2); i++)tempGrid.push({item: null, shown: false, permanentShown : false});
    
    //preencher o grid
    for (let w=0; w<2; w++){
      for(let x=0;x<items.length;x++){
        let pos = -1;
        while (pos < 0 || tempGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length*2));
        }
        tempGrid[pos].item = x;
      }
    }
    //jogar na state
    setGridItems(tempGrid);

    //comeca o jogo
    setPlaying(true);


  }
  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" alt="" />
        </C.LogoLink>
        
        <C.InfoArea>
          <InfoItem label='Tempo' value={formatTimeElapsed(timeelapsed)}/>
            <InfoItem label="Movimentos" value={moveCount.toString()}/>

        </C.InfoArea>

        <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid}/>
      </C.Info>
      <C.GridArea>
        <C.Grid>
        {gridItems.map((item,index)=>(
          <GridItem 
            key = {index}
            item={item}
            onClick={()=>handleItemClick(index)}
          />
        ))}  
        </C.Grid>

      </C.GridArea>
    </C.Container>

  );
}

export default App;
