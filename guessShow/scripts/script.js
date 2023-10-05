const introBtn = document.querySelector('.intro_button')
const modalBtn = document.querySelector('.modal_button')
const modalContainer = document.querySelector('.modal_container')
const modal = document.querySelector('.modal')
const startBtn = document.querySelector('.intro_button')
const intro = document.querySelector('.intro')
const gameButtons = document.querySelectorAll('.show_button')
const show = document.querySelector('.show')
const showText = document.querySelector('.show_desc')
const showRounds = document.querySelectorAll('.show_round')
const rounds = document.querySelectorAll('.show_round')
const end = document.querySelector('.end_body')
const endImage = document.querySelector('.end_image')
const endBorder = document.querySelector('.end_border') 
const endButton = document.querySelector('.end_button').addEventListener('click', () => vkBridge.send("VKClientWebAppActionDispatch", { name: "redirect" }))

function smoothStart(elem, delay = 0) {
    setTimeout(() => {elem.style.opacity = 1}, delay)
}    
function smoothEnd(elem, delay = 0) {
    setTimeout(() => {elem.style.opacity = 0}, delay)
}
function removeClass(elem, className = '', delay = 0) {
    setTimeout(() => {elem.classList.remove(`${className}`)}, delay)
}
function addClass(elem, className = '', delay = 0) {
    setTimeout(() => {elem.classList.add(`${className}`)}, delay)
}

let step = 0;

function wrongButton(button) {
    button.classList.add('wrong')
    removeClass(button, 'wrong', 1000)
    setTimeout(() => {
        button.setAttribute('disabled', 'disabled')
        smoothEnd(button)
    }, 1000)
}
function moveImage() {
    const imageSize = endImage.clientWidth
    const position = imageSize - document.documentElement.clientWidth
    setTimeout(() => {
      endImage.style.transform = `translateX(${-position}px)`
    }, 1000)
}
function resizeEndImage() {
    endImage.style.transition = 0 + 's'
    const imageSize = endImage.offsetWidth
    const position = imageSize - document.documentElement.clientWidth
    endImage.style.transform = 'translateX(0px)'
    setTimeout(() => {
        endImage.style.transition = 20 + 's'
        endImage.style.transform = `translateX(${-position}px)`
    }, 100)
}
window.addEventListener('resize', resizeEndImage)
window.addEventListener('click', e => e.target.className.includes('modal_container') ? closeModal() : null)

// содержимое кнопок

const innerButtonStepOne = [
    'джордан',
    'белфаст',
    'волк с уолл-стрит',
    'игра на понижение',
]
const innerButtonStepTwo = [
    'большое шоу',
    'lab',
    '1+11',
    'что было дальше?',
]
const innerButtonStepThree = [
    'джентельмены',
    'крестный отец',
    'паразиты',
    'ким и пак',
]
const innerButtonStepFour = [
    'офисные игры',
    'неигры',
    'контакты',
    'кстати',
]

// rounds

const roundsType = [
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAABqCAYAAABUIcSXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAb4SURBVHgB7Z0hd+s8DIbVnYHBwcHAwcHBwAsHBws/uJ/ywcHBwcHCwMELBwsLC8d6rVZe00xKnMRObEfPObm9S7Ku8Vtbsi3LK0iMw+FwY15uzXFnDvv/G7p827j9m45943W3Wq2+ISFWkABGHBSgNEcBv8UYyo6Oyoi2h8hJRagX8CdQExTpNfYadgWRY0QqIJxIQO8d8v29EL1QcPrGhyZ6e3UNkYP2w9SqCk42yoLi7eDSSQD4LeoNXDocd7VXSxI2KhnQoTDHHXl9Pt6v8PVeijIdVAsKyBCskVQz7yAwwdxzalaezHFPp9AOvOViD6hvt4azx/gXAtq7IF4f1aD/4CwSgg/0CPlQwqVb/2COdajWw7tQ5oOiGGvg+ybBm4gJ4RyRYy0zZVCCZ7wJRe01NnV/Wm77C/nQ9iylKYu2cuiNFxtF9mgNco3Bvs6Hab+/ICPMc2NzV4I8soF9vXcfdmu0UIxRbbKFk0hZdirp+bElKYRbvDhRo4RyEOnTfMANLACyS6VwebRYg4VyEAlrUU42qRNypCTbNEqsQUKRTUL3mxPpmz7QDhYIdX7XwHuFg6dUhnp9a+BFsh9kkSIh9OyvwI/6Y5k9wwB6C0VuJ+fdZTXyMAYqgzfgxSqGuO69hCKDyY0u2OZOpwsIKot34Oe6HsmeOeMsVC1ugUNFYqBm8F24/KfPYK6TULUOLcdmyTapC1M2W/MidVGeXefEXGtUCbzzgP2kT1BaoTLiyqmtlbrAVSiuPd0vpTPrAyorruV5dKlVnUIJb3J0HkDpC+tcuPSrOoWiN6kapzUgZABUZlXjdOX0u+CIqVk4CYheypYMpDIQmlzEQ8tSURRFURRFURRFURRF8UUSi63ngsbk7BTPZs6B6B+haDoDQ3RxtHy79NFxCld+apwOHmFV0wH5sjpc08VmMCWum41+SX8oBJGQAvjJP19/t6nDo9XBzkc9wOVUO/7/HhZIi0hI6C9uAb91ONYuKxQXDbO4hcgUwiWJtJspRLvAf2z6Ai5wZVGRRR1B/lgWbxAersyPlei6/oPDL2VJh0hYizYT2WspDBquyIA1+V6KI9ElkimHj6nKgv7OL7FQI7RRi232XESC6eG+FEehbhxvzopIRULY5g9t1CxCzdnB7hBp7lWSbNmjUNI6p2AIHexJFhp0iITxihXMi9j0zQF2ppsdu7Xg2HiD1iWVwuUYRELYGhVTvr6gYlEODGlNUiwiicwlFPZNpD7D2ncSKBLpQbgcvUjILEJRf+ENJhArB5EQFIo1XhCYjnWux4VzY8SilD9rSE8k1guXhJqEUGLVVkgWwi0x16ReQgWvURZHsZynXBzyMn1E3tyx3SUUau94czAcxHqmeaJWHEWaY6qiD2KN2jveHJSaWNI441ObWLVOdMoiIWwOjyvywJrN303ozifHULFyEUmwx9/1qXiuVnnty7hSc93bxPrpuHYkz7KJSlKoSQjXkh3L4ar+Q4PJa5TFQSxMplE6irSFdBAncK1QX9INc1ET60u4pYT8MpztpHNHoSiFaEUX8CE3MXwTUSxz4JJ/qekSUyskKJLN8lLBed+rjW22k4mU7RgKshwTRaUoUhdJhTR3iJV1GrrkYs+Fib+sRUKSXCTQECt7kZKG3POXOTrmSk9cc90piqIoiqIoiqJ4xGlkorZHEs6XHEfadSRgGI2yxMFjp721XAMw13AKvbIrMJ5AGQqWXQGnssTXZ5dfck2n3RymKQ4995ZQfsYoi8bpO5dhMNd02lzVLA8TbBScCy17m+x9Nn0fzDkbb6fjbR3UYjs4NuCAk1A0RfzJXGr7AMoZtENc81atHHdS7bOaowIhDwLNvCoMbRuj9QmtdhaKbJW0cdXDIcBuzqnTsjGaDTR1ptf6qNouYxylinWmY61w702Uey9k69i4SsWCTpEGbYw2Zh/eEuJISxMN5AGjTfK+eG7sztYltCd68rJPegqQC47endS3HLV4zsde8SW0b72dZUBkHUppip6vNMIweoWjl3CxDrGQZBY194Xc77bhNC/P7i2ur2OfdARrVzbpT2uj4IVwy0Xs+Fi8pS+gnTFfQU7Pgw+W00AuPkshXLNBoV5EQrzmmSBb9Abykp0C8kGyR1sIsJrEe0IQ9PLMgTWrYi57+4ZFwJY5h5nJgoRXB409r7Xj+Jrd5srkRN3DyR5Via1uVJQFk8SyG2pC0cvCIRps/3f0und192l4Bw8cObilV/zdzxRGT1IR6gVkL8uud5USm9QPDhT7f4ica4gcGp5pC/6wIgxdJ3WLsR+xD3PFlAFTYopmKfrRkuiFIvtRQTiSCCZNKX0BGv8Czo7ALfRv7i4cETil8U5iZD/5Hdlq3pyUweV4pD4Y/A+tlTaddiq/cAAAAABJRU5ErkJggg==',
]

// текст (задание)

const textOneStep = 'В этом фильме рассказывается история Джордана Белфорта, молодого брокера, который стремится к бесконечному богатству и власти на Уолл-стрит. Он погружается в мир алчности, незаконных схем и безудержных эксцессов, до тех пор, пока его жизнь не разрушается под весом собственных преступлений.'
const textTwoStep = 'Ведущий Нурлан Сабуров и комики Алексей Щербаков, Тамби Масаев, Илья Макаров, Эмир Кашоков слушают историю приглашённого гостя, а затем комики пытаются её продолжить.'
const textThreeStep = 'Захватывающая история о двух семьях - бедных Ким и богатых Пак, чьи судьбы переплетаются в неожиданных и запутанных способах. Через коварное манипулирование и клеверные причуды, они вступают в сложную игру классового противостояния, которая приводит к непредсказуемым последствиям.'
const textFourStep = 'Ведущие Азамат Мусагалиев, Гарик Харламов и ещё один секретный ведущий обсуждают новости и общаются с гостями в формате вечернего шоу.'

function clearButtonClasses() {
    gameButtons.forEach(button => {
        removeClass(button, 'match')
        button.removeAttribute('disabled')
    })
}
function renderButtonsText() {
    gameButtons.forEach((item, index) => {
        step === 0 ? item.innerHTML = innerButtonStepOne[index] :
        step === 1 ? item.innerHTML = innerButtonStepTwo[index] :
        step === 2 ? item.innerHTML = innerButtonStepThree[index] :
        step === 3 ? item.innerHTML = innerButtonStepFour[index] : null
    })
}
function renderShowText() {
    step === 0 ? showText.innerHTML = textOneStep :
    step === 1 ? showText.innerHTML = textTwoStep : 
    step === 2 ? showText.innerHTML = textThreeStep : 
    step === 3 ? showText.innerHTML = textFourStep : null
}
function changeRoundsOpacity() {
    rounds.forEach((item, index) => {
        index !== step ? addClass(item, 'transparent') : removeClass(item, 'transparent')
    })
}
function changeRoundToDone() {
    step === 0 ? showRounds[step].setAttribute('src', roundsType[0]) :
    step === 1 ? showRounds[step].setAttribute('src', roundsType[0]) :
    step === 2 ? showRounds[step].setAttribute('src', roundsType[0]) :
    step === 3 ? showRounds[step].setAttribute('src', roundsType[0]) : null
}
function nextStep(button) {
    showFlapper()
    changeRoundToDone()
    smoothEnd(showText, 1000)
    gameButtons.forEach(button => {smoothEnd(button, 1000), button.setAttribute('disabled', 'disabled')})    
    addClass(button, 'match')
    step++
    step === 4 ? loadEnd() : 
    setTimeout(() => {
        renderButtonsText()
        clearButtonClasses() 
        renderShowText()
        smoothStart(showText)
        gameButtons.forEach(button => smoothStart(button))
        changeRoundsOpacity()
    }, 1500)
}

// проверка ответа

gameButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (step === 0)
        { button.innerHTML === 'волк с уолл-стрит' ? nextStep(button) : wrongButton(button) }
        else if (step === 1)
        { button.innerHTML === 'что было дальше?' ? nextStep(button) : wrongButton(button) }
        else if (step === 2)
        { button.innerHTML === 'паразиты' ? nextStep(button) : wrongButton(button) }
        else if (step === 3)
        { button.innerHTML === 'кстати' ? nextStep(button) : wrongButton(button) }
    })
})

// начало игры 

function loadGame() {
    introBtn.setAttribute('disabled', 'disabled')

    smoothEnd(intro)
    addClass(intro, 'none', 500)
    removeClass(show, 'none')
    smoothStart(show, 500)
    removeClass(modalContainer, 'none')
    smoothStart(modalContainer, 500)

    renderButtonsText()
    renderShowText()
    changeRoundsOpacity()
}
function closeModal() {
    modal.classList.add('close-modal')
    smoothEnd(modalContainer)
    addClass(modalContainer, 'none', 500)
}

// конфетти

const showFlapper = () => {
    const flapper1 = document.createElement('div')
    document.body.appendChild(flapper1)
    flapper1.classList.add('flapper1')
    flapper1.classList.add('start')
  
    const getCor = () => {
      let leftX = flapper1.getBoundingClientRect().left
      let leftY = flapper1.getBoundingClientRect().y
      createConfettiLeft(leftX, leftY, 55)
  
    }
    setTimeout(getCor, 500)
    setTimeout(() => {
        flapper1.classList.add('end')
        setTimeout(() => {
            flapper1.remove()
        }, 1200)
    }, 1000)
}
const randomId = function(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
    charactersLength)));
   }
   return result.join('');
}
const createConfettiLeft = function(x, y, confettiCount) {
      let confettiWrapper = document.createElement('div');
      confettiWrapper.classList.add('confettiWrapper');
      let makeId = randomId(10);
      confettiWrapper.setAttribute('data-id', makeId);
      let confettiItem = '';
      let pathes = [
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAAAhCAMAAABuk0wyAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAABpUExURUdwTP8qQf8qQv8gQP8oQP8rQf8qQv8oQP8sQP8qQv8rQv8sQ/8qQP8rQf8sQv8rQf8rQ/8qQv8wQP8qQf8rQv8sQv8rQv8pQv8pQ/8rQ/8rQf8sQv8rQv8qQP8qQv8tQ/8pQf8tQP8rQnndwn0AAAAidFJOUwCQgBBAv2AgQJ/fbzDv76C/rxDfz4CfcFBfz6+PT39QoFAcVEOrAAABD0lEQVQYGbXBCXLDIBAEwAEEu4Au33buzP8fGR+VxJWUXZIsuvEwJ1Jd1IKZSLCxTy2vpd5UeEid45q3pAMmkrxoeV8vGE9N4gBJMI6algOlJa7V+7CvcYu8tRzhBT80tjxptwfBX07NmiNVuBDPK2lhQ1XJWRVsXHOCHmfacn5LHClLeAUgiSXsAHQswgDKMizQsYwd0LCMCjULWUJZxhYILEOAdxZhAAhLWDkcNZzfSnDywdk9O5wpZ+YV3zwfkXw0NocQrI3e+5gVv6ThJI03oXa4q244mt+owwD1iqP47DCUdBzMZ4dRtGs4gN8IJlDzxHuamB0mc5oXT/wvLUwQzED0M1gbT4zNQQWTfAEHBQcV4AY0XQAAAABJRU5ErkJggg==',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAMAAABhTZc9AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAABdUExURUdwTP8qQv8qQf8rQf8qQf8qQP8qQv8oQP8qQv8rQv8rQP8oQP8qQv8gQP8wQP8rQ/8tQ/8sQ/8rQv8sQP8pQf8qQP8sQv8rQf8sQv8qQf8pQ/8sQv8rQv8lQP8rQgJjG0gAAAAedFJOUwCf37+QMIAgYN9fQK8QEL9Qb+9AoE/v73/PUICfMAl44cEAAACgSURBVBgZdcEJcsIwAATBkS1Zkk9ucu7/n4mhkgopvN08y2ko+y6MS/zgz1RiWOpFT2rix/6iDT0Pb9p0yKyKjC9WVcZhhp2sb4iyznCSVSDK6qCTFaHICrCTtUCSVSHLqjDLA66yMlRZGVpZA4yyCpxknaGTNUCR0wCznJ7VqG3v3OVGW9qJh9zoRdvzK382urvWNoSulGOe+CcdU+bFDdF2TnKUStDgAAAAAElFTkSuQmCC',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAA8CAMAAACZ6EL3AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAB4UExURUdwTP8sQv8rQf8sQv8rQf8sQP8qQf8oQP8gQP8rQv8qQP8qQv8rQf8qQv8wQP8sQ/8qQf8rQv8qQv8rQ/8rQv8rQv8rQf8qQv8rQP8rQ/8pQv8tQP8qQP8rQv8pQ/8rQP8oQP8qQf8qQv8rQv8sQv8qQP8sQf8rQkLI9E8AAAAndFJOUwDvv4DvQJAgEN8wYKB/EG/fn4C/78/Pr3BfcFBgj1BfQLCfcH9PkMSujFwAAAIHSURBVBgZxcGHdqMwFAXAC0h6EtW9pm67//+Hm2N77SQGAQa0M/jEWvw/2qz5YW0E/0Ma82ouCK7iZ6sDAvvFbwoEVfHOCwKSiHdWJcLJWeMZwQhrpQglY60lQtmy3gGBrFlvJQjDscESYTg2OSCImI1ShGDYyJUIQLPZEhOQlyx7s7hRbFZgZLaIeLLeCy529HjFmGwR8crtcbFhs1WK8WjHL55xpunhBCORnN/NcZbTwwnGYIuI9w44KRU9nGC4KmKdleBkRx8nGChzbDDHWUwfJxgic2y0KnEiij5O8ChbRPTJcPZEL5fiIbaI6GdwkdPvgP50zFbvuChn9Hsu0YstInawxD+pop8TdGarmN2842rHNgU6sVkcsSuDmz9s4/ZoI1UcsYffuCk3bLV8QzP7Yhx7KvGJzNjO7S1qSGbW7G+OL1LFDqLtXnBj08zEER+iBF89saNoaRYfzHYdcYCf+G7HkBa4lzCcBeokDGSmUS9hEMaiScLpxRoeCSemXuGXcEoqsWiz43QSiw6OitOYC7qRGScwF3QmW45MJRa9JByTSiz6SmccS1xZPEByjkHNNR71NONQcWUxQJlwCGU0hpKcD1JGYxRpzP6U0RiPztlLnGiMTPIZu3Ems5jEMVdssTGZYErHfMN6avOjSi0CsHqxjRWv1GZrqqMgNEn1BxGLgf4Cb/DwnvzJBlsAAAAASUVORK5CYII=',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAByCAMAAAA4cEJcAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAB+UExURUdwTP8gQP8rQf8qQf8sQP8rQv8qQf8oQP8rQf8wQP8qQv8rQv8rQ/8sQv8qQv8oQP8sQ/8pQv8qQP8pQf8sQv8qQv8rQP8qQv8sQv8rQf8rQv8rQv8rQf8rQv8rQv8tQ/8qQf8qQP8qQP8lQP8sQv8qQv8sQf8pQ/8tQP8rQlJ0ldYAAAApdFJOUwAQ799A35AgvxCA77/vYEBvcDCggJ9fr3/Pn3Cgz49QsGBPMK9/kFBQC4tkkAAAAjRJREFUWMO1mdlywjAMRZ3gOE4gIYS9LC3d9f8/2A6FLoAWS1O9n7mKLEuy4pzcsnZeNLAbdaVLtTI0cLa7NDzbw28bThLYroELexF7HOHaJlrZo+ei797DbRsJIhUBs4pldygLtYFl/Y4EC4UuViejzwj0cNnQ7JqCC0b4gWBbhoUF4TQnDER+bjn2jhDm2AEhvOLgXh/q/ECw94zPlK5bkrKzjMzMnEA3zG3yOBszrgYElN3yxQe9x1FQ9HJFZpytV9wFNl7DSgC3ihv8bTUCTyzwWAJPEfjJApf/DtcWtzH40RnOWXRUWB2ZS+Be1xe/rFIPA1TtbCXwUj/E4GVIdCfRsj2xREzkNzoFjQ0fDcFQxWQhy7VzH+m3RNqDRRr1WzJozzSTDJsnorOOYEgzb5IeWL56A/rnhatyy1njpzV0FumxRVpQwauB5XocLH7jaWaqKKLOEy2dB00zSa9Gz1rUq6eWXt1qHoNcRRGFG+vVQ2c5LGeJ2P8rFwbYNFZtDTPCSvPoZ1/CbAHN9vqu4alHNH2fPbnbGelR6jr70Oj2HGU3Z8kbXpfjNkQBePUi9aGABBtwu0mh8KJJZJcJyxgi1G/JbJ2wurq0Z4PTv5cOhYH1BpbYxQgWJUsD65Jy63KplKIcpM3khss+ZTq9kM2SBvo/X9unr7DPqE8f6Dn0017pBWfw5NCxJkRbbl2I0HnsMkkbnV2DMy8ijxXhpwvn63nXi8FTQ/RdHer2PeVP1AfdGwK6nFoSuQAAAABJRU5ErkJggg==',
      ]
      
      for(var i = 0; i < confettiCount; ++i) {
          let path = Math.floor(Math.random() * (pathes.length));
          confettiItem +=
          `
          <div
            class="conf_item"
            style="background: url(${pathes[path]});
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
  
            "
            data-angle="${Math.random()}"
            data-speed="${Math.random()}">
          </div>
          `;
      }
      confettiWrapper.style.position = `fixed`;
      confettiWrapper.style.top = `${y+100}px`;
      confettiWrapper.style.left = `${x}px`;

      confettiWrapper.innerHTML = confettiItem;
  
  
      document.body.appendChild(confettiWrapper);
      let gravity =  50;
      let maxSpeed = 205000;
      let minSpeed = 165000;
      let t = 0;
      let maxAngle = 1500;
      let minAngle = 400;
      let opacity = 1;
      let rotateAngle = 0;

      setTimeout(() => {
        confettiWrapper.remove()
      }, 2000)

    
    let interval = setInterval(function() {
          document.querySelectorAll(`[data-id="${makeId}"] .conf_item`).forEach(function(item) {

              let modifierX = 1;
              let modifierY = 1;
              if(item.classList.contains('reverse')) {
                  modifierX = -1;
              }  
              item.style.opacity = opacity;
    
              let randomNumber = parseFloat(item.getAttribute('data-angle'));
              let otherRandom = parseFloat(item.getAttribute('data-speed'));
    
              let newRotateAngle = randomNumber * rotateAngle;
    
    
              let angle = (randomNumber * (maxAngle - minAngle) + minAngle) / 1000;
              let speed = (randomNumber * (maxSpeed - minSpeed) + minSpeed) / 1000;
              let x = speed * t * Math.cos(angle) + (50 * otherRandom * t);
              let y = speed * t * Math.sin(angle) - (0.5 * gravity * Math.pow(t, 2))  + (50 * otherRandom * t);
              
              item.style.transform = `translateX(${x * modifierX}px) translateY(${y * -1 * modifierY}px) rotateY(${newRotateAngle}deg) scale(${1})`;
          })
          t += 0.1;
          opacity -= 0.01;
          if(t >= 16) {
              t = 0.1;
              if(document.querySelector(`[data-id="${makeId}"]`) !== null) {
                  document.querySelector(`[data-id="${makeId}"]`).remove();
              }
              clearInterval(interval);
          }
      },
    23.33);
}

// load End

function loadEnd() {
    smoothEnd(show)
    addClass(show, 'none', 500)
    removeClass(end, 'none', 500)
    smoothStart(end, 600)
    setTimeout(() => {moveImage()}, 500)
}

introBtn.addEventListener('click', loadGame)
modalBtn.addEventListener('click', closeModal)