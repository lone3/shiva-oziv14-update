const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const ayar = require("../Configs/BotConfig.json");

const RoleModel = require("../Models/Role");
const SafeMember = require("../Models/Safe");

const CategoryChannels = require("../Models/CategoryChannels");
const TextChannels = require("../Models/TextChannels");
const VoiceChannels = require("../Models/VoiceChannels");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("backup")
    .setDescription("Sunucu içindeki kanal ve rol verilerini kaydedersiniz."),
  async execute(interaction, bot) {
    if (!ayar.BotOwner.includes(interaction.user.id)) {
      return interaction.reply({ content: ":x: Bot developerı olmadığın için kurulumu yapamazsın.", ephemeral: true });
    }

    const serverButton = new MessageButton()
      .setCustomId("Server")
      .setLabel("Sunucu")
      .setStyle("SUCCESS")
      .setEmoji('966452273813287022');

    const yetkiButton = new MessageButton()
      .setCustomId("Yetki")
      .setLabel("Yetki")
      .setStyle("SUCCESS")
      .setEmoji('966452262572548166');

    const rolesButton = new MessageButton()
      .setCustomId("Roles")
      .setLabel("Rol")
      .setStyle("SUCCESS")
      .setEmoji('966452244474105896');

    const channelsButton = new MessageButton()
      .setCustomId("Channel")
      .setLabel("Kanal")
      .setStyle("SUCCESS")
      .setEmoji('966452219991953458');

    const cancelButton = new MessageButton()
      .setCustomId("Cancel")
      .setLabel("İşlem İptal")
      .setStyle("DANGER")
      .setEmoji('921703086823714858');

    const row = new MessageActionRow()
      .addComponents([serverButton, yetkiButton, rolesButton, channelsButton, cancelButton]);

    const embed = new MessageEmbed()
      .setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
      .setColor('DARK_BUT_NOT_BLACK')
      .setDescription(`${interaction.member.toString()}, ${interaction.guild.name} sunucusunda kanal ve rol verilerini kaydetmek için aşağıdaki butonları kullanabilirsiniz.`)
      .addFields(
        { name: "\n\u200b", value: "```yaml\nSunucu\n```\nSunucudaki Tüm (Rol/Kanal/Yetki) Verilerini Database Kayıt Eder.", inline: true },
        { name: "\n\u200b", value: "```yaml\nYetki\n```\nSunucudaki Yetkilerin Verilerini Database Kayıt Eder.", inline: true },
        { name: "\n\u200b", value: "```yaml\nRol\n```\nSunucudaki Rollerin Verilerini Database Kayıt Eder.", inline: true }
      )
      .addFields(
        { name: "\n\u200b", value: "```yaml\nKanal\n```\nSunucudaki Kanalların Verilerini Database Kayıt Eder.", inline: true },
        { name: "\n\u200b", value: "```yaml\nİptal\n```\nSunucu Verilerini Database Kayıt Etme İşlemini İptal Eder.", inline: true }
      )
      .setFooter(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 2048 }));

    await interaction.reply({ embeds: [embed], components: [row] });

    const filter = i => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: 'BUTTON', max: 1, time: 30000 });

    collector.on("collect", async (interaction) => {
      // İşlemleri buraya ekle
    });
  }
};

// Diğer fonksiyonları burada tanımlayın ve kodu gerektiği gibi güncelleyin.
