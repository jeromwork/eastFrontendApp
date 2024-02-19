<template>
  <div id="pluses">
    <div class="text-center">
      <div class="vacancy__preheader">ПРЕИМУЩЕСТВА</div>
      <h2 class="text-semibold">Работы в Ист Клиник</h2>
    </div>
    <div class="content__divider"></div>
    <div class="vacancy__pluses">
      <div class="vacancy__pluses__item f-reverse">
        <div class="vacancy__pluses__item__first col-50">
          <div class="vacancy__pluses__item__wrapper">
            <h3 class="flex-container align-center"><span class="icons woman"></span>&nbsp; ‍У нас много пациентов</h3>
            <p class="vacancy__pluses__item__text">Здорово, если у вас сформировалась личная база пациентов. А если нет – мы сами их к вам привлечём. У нас высокие рейтинги и много отзывов.</p>
          </div>
        </div>
        <div class="vacancy__pluses__item__second col-50">
          <v-img class="vacancy__pluses__item__img" src="https://eastclinic.ru/assets/images/vacancy/vacancy-trust.jpg"></v-img>
        </div>
      </div>
      <div class="content__divider"></div>
      <div class="content__divider"></div>
      <div class="vacancy__pluses__item">
        <div class="vacancy__pluses__item__second col-50">
          <v-img class="vacancy__pluses__item__img" src="https://eastclinic.ru/assets/images/vacancy/vacancy-salary.jpg"></v-img>
        </div>
        <div class="vacancy__pluses__item__first col-50 align-end">
          <div class="vacancy__pluses__item__wrapper">
            <h3 class="flex-container align-center">💵 Высокая зарплата</h3>
            <p class="vacancy__pluses__item__text">В зависимости от загрузки врача мы можем поставить любую стоимость приёма. Работаем командно для достижения наилучшего результата. Каждый знает, что должен делать, чтобы пациенты были довольны, а сотрудники получали конкурентноспособную зарплату.</p>
          </div>
        </div>
      </div>
      <div class="content__divider"></div>
      <div class="content__divider"></div>
      <div class="vacancy__pluses__item f-reverse">
        <div class="vacancy__pluses__item__first col-50">
          <div class="vacancy__pluses__item__wrapper">
            <h3 class="flex-container align-center">👣 Клиники рядом с метро</h3>
            <p class="vacancy__pluses__item__text">А значит вы без проблем и за минимальное время будете добираться до работы
            </p>
          </div>

        </div>
        <div class="vacancy__pluses__item__second col-50">
          <v-img class="vacancy__pluses__item__img" src="https://eastclinic.ru/assets/images/vacancy/vacancy-location.jpg"></v-img>
        </div>
      </div>
      <div class="content__divider"></div>
      <div class="content__divider"></div>
      <div class="vacancy__pluses__item">
        <div class="vacancy__pluses__item__second col-50">
          <v-img class="vacancy__pluses__item__img" src="https://eastclinic.ru/assets/images/vacancy/vacancy-time.jpg"></v-img>
        </div>
        <div class="vacancy__pluses__item__first col-50 align-end">
          <div class="vacancy__pluses__item__wrapper">
            <h3 class="flex-container align-center">🗓 Гибкий график</h3>
            <p class="vacancy__pluses__item__text">Каждый наш врач работает по своему индивидуальному графику. Мы охотно подстраиваемся под личные обстоятельства доктора, всегда стараемся найти компромисс.</p>
          </div>
        </div>

      </div>
      <div class="content__divider"></div>
      <div class="content__divider"></div>
      <div class="vacancy__pluses__item f-reverse">
        <div class="vacancy__pluses__item__first col-50">
          <div class="vacancy__pluses__item__wrapper">
            <h3 class="flex-container align-center">📚 Бесплатное обучение</h3>
            <p class="vacancy__pluses__item__text">Мы организовываем бесплатные обучения для наших врачей, предоставляем учебные отпуска и способствуем повышению квалификации специалистов.
            </p>
          </div>
        </div>
        <div class="vacancy__pluses__item__second col-50">
          <v-img class="vacancy__pluses__item__img" src="https://eastclinic.ru/assets/images/vacancy/vacancy-learning.jpg"></v-img>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Advantages",
  data: () => ({
    advatages: [
      {
        'title': '',
        'text': '',
        'image': ''
      }
    ]
  })
}
</script>
