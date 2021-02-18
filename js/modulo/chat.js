export default function chat() {
  const chatBtn = document.querySelector(".js-chat-btn");
  const chatBtnClose = document.querySelector(".js-chat-close");
  const chatContainer = document.querySelector(".js-chat-container");
  const chatMensagerContent = document.querySelectorAll(".js-chat-content");
  const sendMensager = document.querySelector(".js-sender-btn");
  const chatInput = document.querySelector(".js-footer-input");

  const phone = "991888484";
  let animate;
  let init = 0;
  let step = 0;
  let max_step = 3;
  let dateSenderWhats = ["", "", ""];

  const animatedChat = () => {
    const animateTypeZoom = [
      { transform: "scale(0)" },
      { transform: "scale(1)" },
    ];
    const option = {
      duration: 200,
      fill: "both",
    };

    animate = chatContainer.animate(animateTypeZoom, option);
  };

  const getTimeCourseDay = () => {
    const hours = new Date().getHours();
    if (Number(hours) >= 0 && Number(hours) <= 12) {
      return "Bom dia";
    } else if (Number(hours) > 12 && Number(hours) < 18) {
      return "Boa tarde";
    } else if (Number(hours) >= 18 && Number(hours) < 24) {
      return "Boa noite";
    }
  };

  const buildMensager = () => {
    const timeCourse = getTimeCourseDay();
    const mensageStep = [
      {
        text: `<p>${timeCourse}, poderia informar o seu nome ?</p>`,
        select: "",
      },
      {
        text: `<p>Obrigado <strong> ${dateSenderWhats[0]} </strong> <br> Agora fale o tipo do serviço que gostaria de saber mais?</p>`,
        select:
          '<select name="servicos" id="select-servicos" placeholder="esolha o serviço"><option value=""></option><option value="eletrica">ELÉTRICA</option><option value="arcondicionado">AR CONDICIONADO</option><option value="seguranca">SISTEMA DE SEGURANÇA</option><option value="telefonia">SISTEMA DE TELEFONIA</option><option value="cercaEletrica">CERCA ELÉTRICA</option></select>',
      },
      {
        text: `<p>Obrigado <strong> ${dateSenderWhats[0]} </strong> <br> Agora digite sua mensagem ou escolha uma das opções abaixo</p>`,
        select:
          '<select name="mensagem" id="select-mensagem" placeholder="esolha a mensagem"><option value=""></option><option value="cotacao">Cotação sobre o serviço escolhido</option><option value="saber-mais">Saber mais sobre o serviço escolhido</option><option value="geral">Saber mais sobre a empresa</option><option value="outros">Gostaria de bater um papo</option></select>',
      },
    ];

    let mensageDefault = `<div class="chat__boot js-chat-msg-container">
                            <div class="chat__boot__mensager js-chat-mensager">
                              ${mensageStep[step].text}
                              ${mensageStep[step].select}
                            </div>
                            <figure class="chat__boot__img">
                              <i class="fas fa-headset"></i>
                            </figure></div>`;

    chatMensagerContent[chatMensagerContent.length - 1].insertAdjacentHTML(
      "beforeend",
      mensageDefault
    );
  };

  const controlStep = (item, stepNumber) => {
    dateSenderWhats[stepNumber - 1] = item;
    step = stepNumber;
    if (step >= max_step) {
      sendWhatsApp();
      return;
    }
    buildMensager();
  };

  const getSelectWork = () => {
    const selectWork = document.querySelector("#select-servicos");
    selectWork.addEventListener("change", () => {
      const selectValue = selectWork.options[selectWork.selectedIndex].text;

      if (dateSenderWhats[1].length > 0) {
        dateSenderWhats[1] = selectValue;
        return;
      }

      controlStep(selectValue, 2);
      getSelectMensager();
    });
  };

  const getSelectMensager = () => {
    const selectMensager = document.querySelector("#select-mensagem");
    selectMensager.addEventListener("change", () => {
      const selectValue =
        selectMensager.options[selectMensager.selectedIndex].text;
      controlStep(selectValue, 3);
    });
  };

  const replaceWhiteSpace = (msg) => {
    return msg.replaceAll(" ", "%20");
  };

  const verifyWidthDispositivo = () => {
    if (screen.width < 1024 || screen.height < 768) {
      return 1;
    } else {
      return 2;
    }
  };

  const sendWhatsApp = () => {
    const mensageWhats = `Nome: ${dateSenderWhats[0]}%0DServiço: ${dateSenderWhats[1]}%0DAssunto: ${dateSenderWhats[2]}`;
    const widthDispositivo = verifyWidthDispositivo();
    const createElementA = document.createElement("a");
    createElementA.setAttribute("target", "_blank");
    const linkDesk =
      `https://web.whatsapp.com/send?phone=5511${phone}&text=` +
      replaceWhiteSpace(mensageWhats);
    const linkMobile =
      `https://wa.me/5511${phone}?text=` + replaceWhiteSpace(mensageWhats);

    widthDispositivo === 1
      ? createElementA.setAttribute("href", linkMobile)
      : createElementA.setAttribute("href", linkDesk);

    createElementA.click();
  };

  // events button
  sendMensager.addEventListener("click", () => {
    const inputValue = chatInput.value.trim();

    if (step >= max_step - 1 && inputValue.length >= 3) {
      controlStep(inputValue, 3);
      return;
    }

    if (inputValue.length <= 0 || step > 1) return;
    controlStep(inputValue, 1);
    getSelectWork();
    chatInput.value = "";
  });

  chatBtn.addEventListener("click", () => {
    if (init === 0) {
      buildMensager();
      animatedChat();
      init = 1;
      return;
    }
    animate.reverse();
  });

  chatBtnClose.addEventListener("click", () => {
    animate.reverse();
  });
}
