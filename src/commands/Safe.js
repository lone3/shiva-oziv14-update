const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const ayar = require("../Configs/BotConfig.json");
const SafeMember = require("../Models/Safe");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("safe")
    .setDescription("Güvenli listeye üye kelemenizi sağlar.")
    .addUserOption(option =>
      option.setName("kişi")
        .setDescription("Bir kişi belirtebilirsiniz.")
    )
    .addRoleOption(option =>
      option.setName("rol")
        .setDescription("Bir rol belirtebilirsiniz.")
    ),

  async execute(interaction, bot) {
    if (!ayar.BotOwner.includes(interaction.user.id)) {
      return interaction.reply({ content: ":x: Bot geliştiricisi değilsiniz, bu komutu kullanamazsınız.", ephemeral: true });
    }

    const veri = await SafeMember.findOne({
      guildID: interaction.guild.id
    }) || {
      "Full": [],
      "RoleAndChannel": [],
      "Role": [],
      "Channel": [],
      "Bot": [],
      "BanAndKick": [],
      "ChatG": [],
      "Permissions": [],
      "SafeRole": []
    };

    const victim = interaction.options.getMember("kişi") || interaction.options.getRole("rol");

    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('select')
          .setPlaceholder('Güvenli eklemek/çıkarmak istediğiniz kategoriyi seçiniz')
          .addOptions([
            { label: 'Full', value: 'Full' },
            { label: 'Role & Channel', value: 'Role&Channel' },
            { label: 'Role', value: 'Role' },
            { label: 'Channel', value: 'Channel' },
            { label: 'Ban & Kick', value: 'Ban&Kick' },
            { label: 'Bot', value: 'Bot' },
            { label: 'Chat', value: 'Chat' },
            { label: 'Sekme', value: 'Sekme' },
            { label: 'Safe Role', value: 'Saferole' },
          ])
      );

    const row2 = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('select2')
          .setPlaceholder('Güvenli liste bilgilendirme için tıklayınız')
          .addOptions([
            { label: 'Güvenli Liste Bilgilendirme', description: 'Güvenli liste kategorileri hakkında bilgi almanızı sağlar.', value: 'help' },
            { label: 'Güvenli Liste', description: 'Güvenli listede bulunan kişileri gösterir.', value: 'help2' },
          ]),
      );

    if (victim) {
      await interaction.reply({ content: `${victim ? `(${victim})` : ""} Güvenli listeye eklemek veya çıkarmak için aşağıdaki menüyü kullanınız.`, components: [row] });
    } else {
      await interaction.reply({ content: `Güvenli liste hakkında bilgi almak için aşağıdaki menüyü kullanınız.`, components: [row2] });
    }

    // Embed ve diğer işlemler devam ediyor...
  },
};
