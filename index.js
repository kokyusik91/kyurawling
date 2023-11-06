// list_post_article
// item multi_pic
// info_post
// desc
// comments

const axios = require('axios');
const cheerio = require('cheerio');

const getHtml = async () => {
  try {
    const res = await axios.get('https://www.yna.co.kr/sports/all');
    return res;
  } catch (error) {
    console.log(error);
  }
};

getHtml()
  .then((html) => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $('div.list-type038 ul').children('li');
    console.log($bodyList);

    // const postList = $('div.list_post_article').children('div.multi_pic');

    $bodyList.each(function (i, elem) {
      ulList[i] = {
        title: $(this).find('div.news-con a').attr('href'),
        url: $(this).find('strong.tit-news').text(),
        desc: $(this).find('p.lead').text(),
        image_url: 'https:' + $(this).find('figure.img-con img').attr('src'),
        // image_url: $(this).find('p.poto a img').attr('src'),
        // image_alt: $(this).find('p.poto a img').attr('alt'),
        // summary: $(this).find('p.lead').text().slice(0, -11),
        // date: $(this).find('span.p-time').text(),
      };
    });

    const data = ulList;
    console.log('데이터', data);
    return data;
  })
  .then((res) => console.log(res));
