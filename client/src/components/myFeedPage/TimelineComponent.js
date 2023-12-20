import styled from 'styled-components'
export default function TimelineComponent(){
    return(
        <TimeLine>
            <div className='month'>12월</div>
            <div className='post-component'>
                <div className='text-container'>
                    <div>2023년 12월 1일</div>
                    <div>비오는 날 산책</div>
                </div>
                <div className='image'></div>
            </div>
            <div className='post-component'>
                <div className='text-container'>
                    <div>2023년 12월 1일</div>
                    <div>비오는 날 산책</div>
                </div>
                <div className='image'></div>
            </div>
            <div className='post-component'>
                <div className='text-container'>
                    <div>2023년 12월 1일</div>
                    <div>비오는 날 산책</div>
                </div>
                <div className='image'></div>
            </div>
            <div className='month'>1월</div>

            <div className='post-component'>
                <div className='text-container'>
                    <div>2023년 12월 1일</div>
                    <div>비오는 날 산책</div>
                </div>
                <div className='image'></div>
            </div>
            <div className='post-component'>
                <div className='text-container'>
                    <div>2023년 12월 1일</div>
                    <div>비오는 날 산책</div>
                </div>
                <div className='image'></div>
            </div>
            <div className='post-component'>
                <div className='text-container'>
                    <div>2023년 12월 1일</div>
                    <div>비오는 날 산책</div>
                </div>
                <div className='image'></div>
            </div>
        </TimeLine>
    )
}

const TimeLine=styled.div`
display:flex;
flex-direction:column;
align-items:center;
height:100%;
.month{
    margin:25px 0;
}
.post-component{
    position:relative;
    margin:4px 0;

}
.text-container{
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    text-align:center;
   
}
.image{
    width:350px;
    height:160px;
    background-color:#FFF8E6 ;
}
`