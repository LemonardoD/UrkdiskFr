<script lang="ts">
	import { error } from "@sveltejs/kit";
	import { tick } from "svelte";

    export let showAskQuest: boolean

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    let phoneNumber =""
    let email =""
    let question =""

    let showPhoneError = false
    let emailError = false
    let questionError = false

    const sendQuestToApi = async (question: string, phone: string, email: string ) => {
        let requestData:{
            question: string, phone: string, email?: string 
        };

        if (email.length > 0) {
            requestData = {question, phone, email}
        } else {
            requestData = {question, phone}
        }
        const apiResponse = await fetch(`https://ukrdisk-be.fly.dev/order/question`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
            referrerPolicy: "no-referrer",
        });
        if (apiResponse.status !== 200) {
            throw error(apiResponse.status, apiResponse.statusText);
        }   
        return
    };

    const clickOutside = () =>{
        showAskQuest = !showAskQuest;
        phoneNumber=""
        question =""
        email=""
        questionError = false
        showPhoneError = false
        emailError = false
    }

    const askQuest = async () =>{
        if (question.length < 5) {
            questionError = true
        } else if (email.length > 0 && !emailRegex.test(email)) {
            emailError = true
        } else if (phoneNumber.length < 9) {
            showPhoneError = true
        } else {
            await sendQuestToApi(question, phoneNumber, email)
            showAskQuest= !showAskQuest
            emailError = false
            showPhoneError = false
            questionError = false
            phoneNumber=""
            question =""
            email=""
        }
    }

    $: {
            if (typeof document !== 'undefined') {
                tick().then(() => {
                    if(window.innerWidth > 1024 ){
                        document.body.style.overflow = showAskQuest ? 'hidden' : "auto";
                        document.body.style.margin = showAskQuest ? '0 17px 0 0' : "0";
                    } else {
                        document.body.style.overflow = showAskQuest ? 'hidden' : "auto";
                    }
                });
            }
            if (phoneNumber.length >= 9) {
                showPhoneError = false
            }
            if (question.length > 5) {
                questionError = false
            }
            if (email.length === 0 || emailRegex.test(email)) {
                emailError = false
            }
        }
</script>


{#if showAskQuest}
    <!-- svelte-ignore a11y-click-events-have-key-events --><!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="overlay" on:click={clickOutside}/>
    <div class="modal">
        <div class="modalCard">
            <div class="modalHeader">
                <p class="headerTitle">Обратная связь</p>
            </div>
            <div class="content">
                <textarea placeholder="Напишите ваш вопрос" required={true}  minlength="5" class={`inputFieldText ${questionError ? "error" : "normal"}`} 
                bind:value={question} name="quest"/>
                <p class={questionError ? "errorMessage questMessage" : "hideErrMessage"}>Пожалуйста, введите больше символов</p>
                <input placeholder="Ваш email(не обязательно)" maxlength="90" class={`inputField ${emailError ? "error" : "normal"}`} type="email" 
                bind:value={email} name="email">
                <p class={emailError ? "errorMessage emailMessage" : "hideErrMessage"}>Пожалуйста, введите  верний формат почты</p>
                <div class="or">
                    <div class="line"/>
                    <p class="orText">ИЛИ</p>
                    <div class="line"/>
                </div>
                <input placeholder="Ваш номер телефона" required={true} maxlength="30" class={`inputField ${showPhoneError ? "error" : "normal"}`} type="tel" 
                bind:value={phoneNumber} name="tel">
                <p class={showPhoneError ? "errorMessage phMessage" : "hideErrMessage"}>Пожалуйста, введите номер формата 098 222 65 21</p>
                <button aria-label="submit-button" aria-labelledby="submit" class="orderBtn" on:click={askQuest}>Задать вопрос</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .orText{
        font-family: inherit;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.14px;
        color: #829dba;
    }
    .or{
        width: 404px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
    .line{
        width: 170px;
        border-bottom: solid 2px #829dba;
    }
    .hideErrMessage{
        display: none;
    }
    .emailMessage{
        bottom: 158px;
    }
    .phMessage{
        bottom: 62px;
    }
    .questMessage{
        bottom: 206px;
    }
    .errorMessage{
        position: absolute;
        margin: 0;
        font-family: inherit;
        font-size: 10.5px;
        color: red;
    }
    .normal{
        border: solid 1px #ccc;
    }
    .error{
        border: 1px solid red;
    }
    .inputField.error:focus , .inputFieldText.error:focus{
        background-color: #eceff1;
        border: 1px solid red;
        outline: none;
    }
    .inputField:focus, .inputFieldText:focus  {
        background-color: #eceff1;
        border: 1px solid #c4c8cc;
        outline: none;
    }
    
    .inputFieldText{
        margin-bottom: 4px;
        resize: none;
        height: 124px;
        padding: 8px 14px;
        width: 90%;
        font-family: inherit;
        font-weight: 400;
        font-size: 14px;
        text-align: left;
        color: #909090;
        border-radius: 4px;
        background-color: #fff;
    }
    .inputField{
        margin: 8px 0px;
        padding: 8px 14px;
        width: 90%;
        font-family: inherit;
        font-weight: 400;
        font-size: 14px;
        text-align: left;
        color: #909090;
        border-radius: 4px;
        background-color: #fff;
    }
    .headerTitle{
        margin: 0px 12px;
        text-align: center;
    }
     .orderBtn:hover{
        opacity: 1;
    }
    .orderBtn{
        align-self: flex-end;
        cursor: pointer;
        margin-top: 12px;
        margin-right: 7px;
        width: 40%;
        height: 32px;
        font-family:inherit;
        font-size: 14px;
        letter-spacing: 0.5px;
        font-weight: 500;
        opacity: 0.9;
        border: none;
        border-radius: 4px;
        color: #fff;
        background-color: #507298;
    }
    .content{
        position: relative;
        align-items: center;
        padding: 24px;
        flex-direction: column;
        display: flex;
        width: 416px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        background-color: #eceff1;
        box-shadow: #00000040 0px 14px 45px, #00000038 0px 10px 18px;
    }
    .modalHeader{
        display: flex;
        align-items: center;
        color: #fff;
        font-family: inherit;
        font-size: 16px;
        text-align: center;
        width: 100%;
        margin: 0;
        height: 40px;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
        background-color: #507299;
        z-index: 2;
    }
    .modalCard{
        width: 464px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 4px;
    }
    .overlay {
        z-index: 10;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #00000080;
    }

    .modal {
        position: fixed;
        opacity: 0.7;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
        transition: all 0.3s ease;
        animation: floatIn 0.3s ease-in-out 0s forwards;
    }
    @keyframes floatIn {
        to {
            opacity: 1;
            top: 50%; 
        }
    }

    @media(max-width: 480px){
        .orderBtn{
            font-size: 12px;
        }
        .or{
            width: 304px;
        }
        .line{
            width: 110px;
        }
        .content{
            width: 314px;
        }
        .modalCard{
            width: 364px;
        }
    }
</style>