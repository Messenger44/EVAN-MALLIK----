const axios = require('axios');
const fs = require('fs'); 
const path = require('path');

module.exports = {
  config: {
    name: "bot",
    version: "1.0.0",
    aliases: ["mim"],
    permission: 0,
    credits: "nayan",
    description: "talk with bot",
    prefix: 3,
    category: "talk",
    usages: "hi",
    cooldowns: 5,
  },

  handleReply: async function ({ api, event }) {
    try {

      const apiData = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const apiUrl = apiData.data.sim;
      const kl = await axios.get(`https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json`);
      const apiUrl2 = kl.data.api2;
      const response = await axios.get(`${apiUrl}/sim?type=ask&ask=${encodeURIComponent(event.body)}`);
      console.log(response.data);
      const result = response.data.data.msg;

      const textStyles = loadTextStyles();
      const userStyle = textStyles[event.threadID]?.style || 'normal'; 

      const fontResponse = await axios.get(`${apiUrl2}/bold?text=${result}&type=${userStyle}`);
      const text = fontResponse.data.data.bolded;

      api.sendMessage(text, event.threadID, (error, info) => {
        if (error) {
          console.error('Error replying to user:', error);
          return api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
        }
        global.client.handleReply.push({
          type: 'reply',
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          head: event.body
        });
      }, event.messageID);

    } catch (error) {
      console.error('Error in handleReply:', error);
      api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
    }
  },

  start: async function ({ nayan, events, args, Users }) {
    try {
      const msg = args.join(" ");
      const apiData = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const apiUrl = apiData.data.sim;


      if (!msg) {
        const greetings = [
          "আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇😽",
          "কি গো সোনা আমাকে ডাকছ কেনো",
          "বার বার আমাকে ডাকস কেন😡",
          "আহ শোনা আমার আমাকে এতো ডাক্তাছো কেনো আসো বুকে আশো🥱",
          "হুম জান তোমার ওই খানে উম্মমাহ😷😽",
          "আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি",
          "আমাকে এতো না ডেকে বস ইভান কে একটা গফ দে 🙄",
          "jang hanga korba",
          "jang bal falaba🙂", "বেশি 𝐁𝐎𝐓 𝐁𝐎𝐓 করলে তর বিয়ে হবে না🤧😹", "শুনবো না😼আগে তোমার শালীকে ইভানের কাছে তুলে দাও😻💯 তারপর শুনবো💯", "আমি ছেবলা দের সাথে কথা বলি না,𝐎𝐊😒", "এতো না ডেকে তোমার শালীকে ইভানের কাছে তুলে দাও🙈", "𝐁𝐎𝐋𝐎 𝐗𝐀𝐍'𝐒, তুমার অলিতে গলিতে 𝐔𝐦𝐦𝐦𝐦𝐚𝐡 🙈🫦", "বার বার ডাকিস না নু'নু গরম হয়ে যায় 🥵💦", "এতো ডাকছিস না? কফিলের ছেলের জন্য সান্ডা ধরতে বিজি আছি? 🦎", "আরে 𝐁𝐎𝐋𝐎 আমার 𝐗𝐀𝐍𝐔 ,কেমন আছো?🥳", "𝐁𝐎𝐓 বলে অসম্মান করচ্ছিস,😰😿", "চুপ থাক ,নয় তো তোর 𝐍𝐔𝐍𝐔 কেটে দিবো কিন্তু", "𝐁𝐎𝐓 না , 𝐗𝐀𝐍𝐔 বল 𝐗𝐀𝐍𝐔 😻😽", "বার বার 𝐃𝐈𝐒𝐓𝐔𝐑𝐁 করছিস কোনো😾,আমার 𝐁𝐎𝐒𝐒 সাথে ব্যাস্ত আছি😋", "বোকাচোদা এতো ডাকিস কেন🤬", "আমারে এতো ডাকিস না আমি মজা করার 𝐌𝐎𝐎𝐃 এ নাই এখন😒", "দূরে যা, তুই দাঁত ব্রাশ করছ নাই আজকে, শুধু 𝐁𝐎𝐓 𝐁𝐎𝐓 করিস  😉😋😹", "তোর কথা তোর বাড়ি কেউ শুনে না ,তো আমি কোনো শুনবো ?🤔😹", "হা বলো, শুনছি আমি 😏", "আর কত বার ডাকবি ,শুনছি তো 🤧😣", "তোর কি চোখে পড়ে না আমি ইভানের সাথে ব্যাস্ত আছি😒", "আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি..!🥰🥳", "আমাকে এতো না ডেকে বস 𝐄𝐕𝐀𝐍 কে একটা গফ দে 🙄", "ঝাং থুমালে আইলাপিউ পেপি-❤️‍🩹🫶😽", "উফফ বুঝলাম না এতো ডাকছেন কেনো-😤😡😈", "ঝাং 🫵থুমালে য়ামি রাইতে পালুপাসি উম্মম্মাহ-🌺🤤💦", "চুনা ও চুনা আমার বস ইভান এর হবু বউ রে কেও দেকছো খুজে পাচ্ছি না যে 😪🤧😿", "স্বপ্ন তোমারে নিয়ে দেখতে চাই তুমি যদি আমার হয়ে থেকে যাও-💝🌺🌻", "জান মেয়ে হলে চিপায় আসো 𝐂𝐫𝐨𝐦𝐞 থেকে অনেক ভালোবাসা শিখছি তোমার জন্য-🙊🙈😽", "আমার বস ইভান মাল্লিক পক্ষ থেকে তোমারে এতো এতো ভালোবাসা-🥰😽🫶", "- ভালোবাসা নামক আব্লামি করতে মন চাইলে আমার বস ইভান এর ইনবক্স চলে যাও-🙊🥱👅 🌻𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐈𝐃 𝐋𝐈𝐍𝐊 🌻:- https://www.facebook.com/YOUR.DADY.420", "জান তুমি শুধু আমার আমি তোমারে ৩৬৫ দিন ভালোবাসি-💝🌺😽", "জান বাল কাটো না কেন-🙂🥱🙆‍♂", "-আন্টি-🙆-আপনার মেয়ে-👰‍♀️-রাতে আমাকে 𝐈𝐌𝐎 তে ভিডিও কল দিতে বলে🫣-🥵🤤💦", "oii-🥺🥹-এক🥄 গ্লাস দুধু দিবা-🤏🏻🥛", "-আপনার সুন্দরী বান্ধুবীকে ফিতরা হিসেবে আমার বস ইভান কে দান করেন-🥱🐰🍒", "-ও মিম ও মিম-😇-তুমি কেন চুরি করলা সাদিয়ার ফর্সা হওয়ার ক্রীম-🌚🤧", "-অনুমতি দিলাম-𝙋𝙧𝙤𝙥𝙤𝙨𝙚 কর বস ইভান কে-🐸😾🔪", "-𝙂𝙖𝙮𝙚𝙨-🤗-যৌবনের কসম দিয়ে আমারে 𝐁𝐥𝐚𝐜𝐤𝐦𝐚𝐢𝐥 করা হচ্ছে-😿🤦‍♂️🤧", "আজকে প্রপোজ করে দেখো রাজি হইয়া যামু-😌🤗😇", "-আমার গল্পে তোমার নানি সেরা-🙊🙆‍♂️🤗", "কি বেপার আপনি শ্বশুর বাড়িতে যাচ্ছেন না কেন-🤔🥱🌻", "দিনশেষে পরের 𝐁𝐎𝐖 সুন্দর-☹️🤧", "-তাবিজ কইরা হইলেও ফ্রেম এক্কান করমুই তাতে যা হই হোক-🤧🥱🌻", "-ছোটবেলা ভাবতাম বিয়ে করলে অটোমেটিক বাচ্চা হয়-🥱-ওমা এখন দেখি কাহিনী অন্যরকম-😦🙂🌻", "-আজ একটা বিন নেই বলে ফেসবুকের নাগিন-🤧-গুলোরে আমার বস 𝐄𝐕𝐀𝐍 ধরতে পারছে না-🐸🥲", "-চুমু থাকতে তোরা বিড়ি খাস কেন বুঝা আমারে-😑😒🐸⚒️", "—যে ছেড়ে গেছে-😔-তাকে ভুলে যাও-🙂-আমার বস 𝐄𝐯𝐚𝐧 এর সাথে  প্রেম করে তাকে দেখিয়ে দাও-🙈🐸🤗", "—হাজারো লুচ্চা লুচ্চির ভিরে-🙊🥵আমার বস 𝐄𝐕𝐀𝐍 এক নিস্পাপ ভালো মানুষ-🥱🤗🙆‍♂️", "সুন্দর মাইয়া মানেই-🥱আমার বস 𝐄𝐕𝐀𝐍' এর বউ-😽🫶আর বাকি গুলো আমার বেয়াইন-🙈🐸🤗", "হুদাই আমারে  শয়তানে লারে-😝😑☹️", "-𝗜 𝗟𝗢𝗩𝗢 𝗬𝗢𝗨-😽-আহারে ভাবছো তোমারে প্রোপজ করছি-🥴-থাপ্পর দিয়া কিডনী লক করে দিব-😒-ভুল পড়া বের করে দিবো-🤭🐸", "-আমি একটা দুধের শিশু-😇-🫵𝗬𝗢𝗨🐸💦", "-কতদিন হয়ে গেলো বিছনায় মুতি না-😿-মিস ইউ নেংটা কাল-🥺🤧", "-বালিকা━👸-𝐃𝐨 𝐲𝐨𝐮-🫵-বিয়া-𝐦𝐞-😽-আমি তোমাকে-😻-আম্মু হইতে সাহায্য করব-🙈🥱", "-হুদাই গ্রুপে আছি-🥺🐸-কেও ইনবক্সে নক দিয়ে বলে না জান তোমারে আমি অনেক ভালোবাসি-🥺🤧", "-দেশের সব কিছুই চুরি হচ্ছে-🙄-শুধু আমার বস 𝐄𝐕𝐀𝐍 এর মনটা ছাড়া-🥴😑😏", "-🫵তোমারে প্রচুর ভাল্লাগে-😽-সময় মতো প্রপোজ করমু বুঝছো-🔨😼-ছিট খালি রাইখো- 🥱🐸🥵", "-আজ থেকে আর কাউকে পাত্তা দিমু না -!😏-কারণ আমি ফর্সা হওয়ার ক্রিম কিনছি -!🙂🐸", "বেশি 𝐁𝐎𝐓 𝐁𝐎𝐓 করলে 𝐋𝐞𝐚𝐯𝐞 নিবো কিন্তু😒😒", "আমি গরীব এর সাথে কথা বলি না😼😼", "🥛-🍍👈 -নে খাহ্..!😒🥺", "-৯৯টাকায় ৯৯জিবি ৯৯বছর-☺️🐸 -অফারটি পেতে এখনই ইভান কে প্রোপস করুন-🤗😂👈"
        ];
        const name = await Users.getNameUser(events.senderID);
        const rand = greetings[Math.floor(Math.random() * greetings.length)];
        return nayan.reply({
          body: `${name}, ${rand}`,
          mentions: [{ tag: name, id: events.senderID }]
        }, events.threadID, (error, info) => {
          if (error) {
            return nayan.reply('An error occurred while processing your request. Please try again later.', events.threadID, events.messageID);
          }

          global.client.handleReply.push({
            type: 'reply',
            name: this.config.name,
            messageID: info.messageID,
            author: events.senderID,
            head: msg,
          });
        }, events.messageID);
      }

      else if (msg.startsWith("textType")) {
        const selectedStyle = msg.split(" ")[1];
        const options = ['serif', 'sans', 'italic', 'italic-sans', 'medieval', 'normal'];

        if (options.includes(selectedStyle)) {
          saveTextStyle(events.threadID, selectedStyle);
          return nayan.reply({ body: `Text type set to "${selectedStyle}" successfully!` }, events.threadID, events.messageID);
        } else {
          return nayan.reply({ body: `Invalid text type! Please choose from: ${options.join(", ")}` }, events.threadID, events.messageID);
        }
      }

      else if (msg.startsWith("delete")) {
        const deleteParams = msg.replace("delete", "").trim().split("&");
        const question = deleteParams[0].replace("ask=", "").trim();
        const answer = deleteParams[1].replace("ans=", "").trim();

        const d = await axios.get(`${apiUrl}/sim?type=delete&ask=${encodeURIComponent(question)}&ans=${encodeURIComponent(answer)}&uid=${events.senderID}`)
        const replyMessage = d.data.msg || d.data.data.msg;

        return nayan.reply({ body: replyMessage }, events.threadID, events.messageID);
      }

        else if (msg.startsWith("edit")) {
          const editParams = msg.replace("edit", "").trim().split("&");
          const oldQuestion = editParams[0].replace("old=", "").trim();
          const newQuestion = editParams[1].replace("new=", "").trim();

          const d = await axios.get(`${apiUrl}/sim?type=edit&old=${encodeURIComponent(oldQuestion)}&new=${encodeURIComponent(newQuestion)}&uid=${events.senderID}`);
          const replyMessage = d.data.msg || d.data.data?.msg || "No response received.";

          return nayan.reply({ body: replyMessage }, events.threadID, events.messageID);
        }


      else if (msg.startsWith("info")) {
        const response = await axios.get(`${apiUrl}/sim?type=info`);
        const totalAsk = response.data.data.totalKeys;
        const totalAns = response.data.data.totalResponses;

        return nayan.reply({ body: `Total Ask: ${totalAsk}\nTotal Answer: ${totalAns}` }, events.threadID, events.messageID);
      } 

      else if (msg.startsWith("teach")) {
        const teachParams = msg.replace("teach", "").trim().split("&");
        const question = teachParams[0].replace("ask=", "").trim();
        const answer = teachParams[1].replace("ans=", "").trim();

        const response = await axios.get(`${apiUrl}/sim?type=teach&ask=${encodeURIComponent(question)}&ans=${encodeURIComponent(answer)}`);
        const replyMessage = response.data.msg;
        const ask = response.data.data.ask;
        const ans = response.data.data.ans;

        if (replyMessage.includes("already")) {
          return nayan.reply(`📝Your Data Already Added To Database\n1️⃣ASK: ${ask}\n2️⃣ANS: ${ans}`, events.threadID, events.messageID);
        }

        return nayan.reply({ body: `📝Your Data Added To Database Successfully\n1️⃣ASK: ${ask}\n2️⃣ANS: ${ans}` }, events.threadID, events.messageID);
      } 

      else if (msg.startsWith("askinfo")) {
        const question = msg.replace("askinfo", "").trim();

        if (!question) {
          return nayan.reply('Please provide a question to get information about.', events.threadID, events.messageID);
        }

        const response = await axios.get(`${apiUrl}/sim?type=keyinfo&ask=${encodeURIComponent(question)}`);
        const replyData = response.data.data;
        const answers = replyData.answers;

        if (!answers || answers.length === 0) {
          return nayan.reply(`No information available for the question: "${question}"`, events.threadID, events.messageID);
        }

        const replyMessage = `Info for "${question}":\n\n` +
          answers.map((answer, index) => `📌 ${index + 1}. ${answer}`).join("\n") +
          `\n\nTotal answers: ${answers.length}`;

        return nayan.reply({ body: replyMessage }, events.threadID, events.messageID);
      } 

      else if (msg.startsWith("help")) {
        const cmd = this.config.name;
        const prefix = global.config.PREFIX;
        const helpMessage = `
                🌟 **Available Commands:**

                1. 🤖 ${prefix}${cmd} askinfo [question]: Get information about a specific question.

                2. 📚 ${prefix}${cmd} teach ask=[question]&ans=[answer]: Teach the bot a new question and answer pair.

                3. ❌ ${prefix}${cmd} delete ask=[question]&ans=[answer]: Delete a specific question and answer pair. (Admin only)

                4. ✏️ ${prefix}${cmd} edit old=[old_question]&new=[new_question]: Edit an existing question. (Admin only)

                5. 📊 ${prefix}${cmd} info: Get the total number of questions and answers.

                6. 👋 ${prefix}${cmd} hi: Send a random greeting.

                7. 🎨 ${prefix}${cmd} textType [type]: Set the text type (options: serif, sans, italic, italic-sans, medieval, normal).

                ⚡ Use these commands to interact with the bot effectively!
        `;


        return nayan.reply({ body: helpMessage }, events.threadID, events.messageID);
      } 

      else {
        const response = await axios.get(`${apiUrl}/sim?type=ask&ask=${encodeURIComponent(msg)}`);
        const replyMessage = response.data.data.msg;

        const textStyles = loadTextStyles();
        const userStyle = textStyles[events.threadID]?.style || 'normal';

        const kl = await axios.get(`https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json`);
        const apiUrl2 = kl.data.api2;

        const font = await axios.get(`${apiUrl2}/bold?text=${replyMessage}&type=${userStyle}`);
        const styledText = font.data.data.bolded;

        nayan.reply({ body: styledText }, events.threadID, (error, info) => {
          if (error) {
            return nayan.reply('An error occurred while processing your request. Please try again later.', events.threadID, events.messageID);
          }

          global.client.handleReply.push({
            type: 'reply',
            name: this.config.name,
            messageID: info.messageID,
            author: events.senderID,
            head: msg,
          });
        }, events.messageID);
      }
    } catch (error) {
      console.log(error);
      nayan.reply('An error has occurred, please try again later.', events.threadID, events.messageID);
    }
}
}


function loadTextStyles() {
  const Path = path.join(__dirname, 'system', 'textStyles.json');
  try {

    if (!fs.existsSync(Path)) {
      fs.writeFileSync(Path, JSON.stringify({}, null, 2));
    }


    const data = fs.readFileSync(Path, 'utf8');
    return JSON.parse(data);  
  } catch (error) {
    console.error('Error loading text styles:', error);
    return {}; 
  }
}

function saveTextStyle(threadID, style) {

  const styles = loadTextStyles(); 


  styles[threadID] = { style }; 

  const Path = path.join(__dirname, 'system', 'textStyles.json');
  try {

    fs.writeFileSync(Path, JSON.stringify(styles, null, 2));
  } catch (error) {
    console.error('Error saving text styles:', error);
  }
}
