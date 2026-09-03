const aside = document.querySelector('aside');
const closeSidebar = aside.querySelector('.closeSidebar');
const sidebarLinks = aside.querySelectorAll('nav a, .logo');
const textareaSec = document.querySelector('.textareaSection');
const strOverview = document.querySelector('.stringOverview');
const userText = textareaSec.querySelector('#userText');
const analyzeBtn = textareaSec.querySelector('.analyzeBtn');
const totalChar = strOverview.querySelector('.character');
const totalWords = strOverview.querySelector('.word');
const totalVowels = strOverview.querySelector('.vowels');
const totalSpaces = strOverview.querySelector('.spaces')
const clearBtn = document.querySelector('.clearBtn');
const dropdown = textareaSec.querySelector('#sampleTextDecoration')
const vowelAnalytics = document.querySelector('.vowelAnalytics');
const vowelRepeatation = document.querySelector('.vowelRepeatation');
const opdropDown = textareaSec.querySelector('#operation')
const heroBox = document.querySelector('.heroBox');
const oldResbox = document.querySelector('.resultArea');
let oldResult = oldResbox.innerHTML;


// loader timing 
const loadStartTime = performance.now();
const pageLoaderFun = () => {
    const minimumTiming = 1000;
    const loadEndTime = performance.now();
    const actualLoadTime = loadEndTime - loadStartTime;

    const remainingTime = Math.max(0, minimumTiming - actualLoadTime);

    setTimeout(() => {
        const pageLoader = document.querySelector('.pageLoader');
        if (pageLoader) pageLoader.remove();
    }, remainingTime);
}
document.addEventListener('DOMContentLoaded', pageLoaderFun)

// open sidebar Navigation 
aside.addEventListener('click', () => {
    if (!aside.classList.contains('expanded')) {
        aside.classList.add('expanded');
    }
});

//close sidebar navigation
closeSidebar.addEventListener('click', (e) => {
    e.stopPropagation();
    aside.classList.remove('expanded');
});

sidebarLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.stopPropagation();
    })
});

// analyzing string function 
const analyzeFun = () => {
    let input = userText.value;
    let char = input;
    let words = input.trim().split(/\s+/);
    let wordsCount = (input.trim() === "") ? 0 : words.length;
    let vowelsCount = 0;
    let spacesCount = 0;
    totalChar.innerText = char.length || '0';
    totalWords.innerText = wordsCount || '0';
    for (let i = 0; i < input.length; i++) {
        let char = input[i].toLowerCase();

        if (char === "a" || char === "e" || char === "i" || char === "o" || char === "u"
        ) {
            vowelsCount++;
        } else if (char === " ") {
            spacesCount++
        }
    }
    if (vowelsCount >= 50) {
        vowelRepeatation.innerText = 'Many  Vowels';
    } else if (vowelsCount >= 15) {
        vowelRepeatation.innerText = 'Normal Vowels';
    } else if (vowelsCount > 0) {
        vowelRepeatation.innerText = 'Less Vowels';
    } else {
        vowelRepeatation.innerText = 'No Vowel';
    }
    totalVowels.innerText = vowelsCount || '0';
    vowelAnalytics.innerText = vowelsCount || '0'
    totalSpaces.innerText = spacesCount || '0';
    saveToLocalStorage();
}

// generating random peragraph in textarea
dropdown.addEventListener('change', async (e) => {
    const selectedOption = e.target.value;

    if (selectedOption === 'para1' || selectedOption === 'para2' || selectedOption === 'para3' || selectedOption === 'para4') {
        userText.setAttribute('placeholder', 'Loading sample text ...');
        try {

            const response = await fetch('https://baconipsum.com/api/?type=all-meat&paras=5&format=json');
            const data = await response.json();
            userText.value = data[0];
        } catch (error) {
            userText.setAttribute('placeholder', 'Failed to load text. Please try again.');
            console.error('cors bypass error:', error);
        }
    } else {
        userText.value = '';
        userText.setAttribute('placeholder', 'Enter your text here ...');
    }
});

// performing operations on string
opdropDown.addEventListener('change', (e) => {
    const selectedOper = e.target.value;

    if (selectedOper !== 'original') {
        if (userText.value.length > 0) {
            const existingErr = document.querySelector('.err');
            const existinInput = document.querySelectorAll('.replaceOperator');
            if (existingErr) existingErr.remove();
            if (existinInput) existinInput.forEach(input => input.remove());
            if (!document.querySelector('.tempBox')) {
                const resBox = document.createElement('div');
                resBox.classList.add('operationResult', 'tempBox', 'box', 'stack');
                resBox.innerHTML = `<div class="iconHeading">
                                <i class="resIcon" data-lucide="sparkles"></i>
                                <h2>Operation Result</h2>
                            </div>
                            <div id="resultText" class="resultArea stack"></div>
                            <button resultText="resultText" class="copyBtn btn">Copy Result</button>
        `;
                heroBox.append(resBox);
            }
            const resultArea = document.querySelectorAll('.resultArea');
            let originalText = userText.value;
            let text = userText.value;
            if (selectedOper === 'upperCase') {
                text = text.toUpperCase();
                resultArea.forEach((box) => {
                    box.innerHTML = text;
                });
            } else if (selectedOper === 'lowerCase') {
                text = text.toLowerCase();
                resultArea.forEach((box) => {
                    box.innerHTML = text;
                });
            } else if (selectedOper === 'capitalize') {
                text = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                resultArea.forEach((box) => {
                    box.innerHTML = text;
                });
            } else if (selectedOper === 'trim') {
                text = text.trim();
                resultArea.forEach((box) => {
                    box.innerHTML = text;
                });
            } else if (selectedOper === 'replace') {
                if (!document.querySelector('.replaceOperator')) {
                    let wordInput = document.createElement('input');
                    let wordWant = document.createElement('input');
                    wordInput.classList.add('replaceOperator');
                    wordInput.setAttribute('placeholder', 'Which word you want replace enter here');
                    wordWant.classList.add('replaceOperator');
                    wordWant.setAttribute('placeholder', 'Write here word you want place')
                    userText.before(wordInput);
                    userText.before(wordWant);
                    function updateReplace() {
                        text = originalText.replace(wordInput.value, wordWant.value);

                        resultArea.forEach((box) => {
                            userText.value = text;
                            box.innerHTML = text;
                        })
                    }
                    wordInput.addEventListener('input', updateReplace);
                    wordWant.addEventListener('input', updateReplace);
                }
            } else if (selectedOper === 'reverse') {
                text = text.split(' ').reverse().join(' ');
                resultArea.forEach(box => box.innerHTML = text)
            } else if (selectedOper === 'includes') {
                if (!document.querySelector('.replaceOperator')) {
                    let perInclude = document.createElement('input');
                    perInclude.classList.add('replaceOperator');
                    perInclude.setAttribute('placeholder', 'Which paragraph you want include add here');
                    userText.before(perInclude);

                    perInclude.addEventListener('input', () => {
                        text = originalText.concat(' ', perInclude.value);
                        resultArea.forEach(box => box.innerHTML = text);
                        console.log(perInclude.value)
                    });
                }
            } else if (selectedOper === 'split') {
                text = text.split(' ');
                resultArea.forEach(box => box.innerHTML = text)
            }
        } else {
            if (!document.querySelector('.err')) {
                let warning = document.createElement('p');
                warning.classList.add('err');
                warning.innerText = "Please add text to perform any operation";
                textareaSec.append(warning);
            }
        }
    } else {
        const resBox = document.querySelector('.tempBox');
        if (resBox) resBox.remove();
    }

});

// copyResult result content
document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('copyBtn')) {
        const btn = event.target;

        const targetText = btn.getAttribute('resultText');
        const textToCopy = document.getElementById(targetText);
        console.log(textToCopy)

        if (textToCopy) {
            const textContent = textToCopy.innerText || textToCopy.value;

            navigator.clipboard.writeText(textContent)
                .then(() => {
                    const originalText = btn.innerText;
                    btn.innerText = '✓ Copied!';

                    setTimeout(() => {
                        btn.innerText = originalText;
                    }, 1500);
                }).catch(err => {
                    console.error('Copy failed', err)
                });
        }
    }
});

// local storage support
const saveToLocalStorage = () => {
    const textarea = {
        inputText: userText.value,
    }

    const analyzed = {
        character: totalChar.innerText,
        words: totalWords.innerText,
        vowels: totalVowels.innerText,
        spaces: totalSpaces.innerHTML
    }

    const appData = {
        textarea,
        analyzed
    }

    localStorage.setItem('stringLab', JSON.stringify(appData));
}

// fetch localStorage data 
const loadLocalStorage = () => {
    const savedData = localStorage.getItem('stringLab');
    const textarea = JSON.parse(savedData).textarea;
    userText.value = textarea.inputText;

    const analyzed = JSON.parse(savedData).analyzed;
    totalChar.innerText = analyzed.character;
    totalWords.innerText = analyzed.words;
    totalVowels.innerText = analyzed.vowels;
    totalSpaces.innerHTML = analyzed.spaces;
}

// clear all function
const clearFun = () => {
    userText.value = '';
    totalChar.innerText = '-';
    totalWords.innerText = '-';
    totalVowels.innerText = '-';
    vowelAnalytics.innerText = '-';
    vowelRepeatation.innerText = 'Vowel Repeatation';
    totalSpaces.innerText = '-';
    dropdown.value = '';
    opdropDown.value = '';
    let existingInput = document.querySelectorAll('.replaceOperator');
    existingInput.forEach(input => input.remove());
    userText.setAttribute('placeholder', 'Enter your text here ...');
    let resBox = document.querySelector('.tempBox');
    if (resBox) resBox.remove();
    let resArea = document.querySelector('.resultArea');
    resArea.innerHTML = oldResult;
    saveToLocalStorage();

}

analyzeBtn.addEventListener('click', analyzeFun);
clearBtn.addEventListener('click', clearFun)
userText.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') analyzeFun();
});

window.addEventListener('load', loadLocalStorage);