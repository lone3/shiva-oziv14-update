const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const Config = require("../Configs/BotConfig.json");
const CategoryChannels = require("../Models/CategoryChannels");
const TextChannels = require("../Models/TextChannels");
const VoiceChannels = require("../Models/VoiceChannels");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kanal-kur")
    .setDescription("Silinen Ses/Yazı/Kategori Kanal Kurulumunu Gerçekleştirebilirsiniz.")
    .addStringOption(option =>
      option.setName("id")
        .setDescription("Kurulacak kanal/kategori ID'sini belirtin.")
        .setRequired(true)
    ),
  async execute(interaction, bot) {
    if (!Config.BotOwner.includes(interaction.user.id)) {
      return interaction.reply({ content: ":x: Bot geliştiricisi değilsiniz, bu komutu kullanamazsınız.", ephemeral: true });
    }

    const channelId = interaction.options.getString("id");
    const textData = await TextChannels.findOne({ channelID: channelId });
    const voiceData = await VoiceChannels.findOne({ channelID: channelId });
    const categoryData = await CategoryChannels.findOne({ channelID: channelId });

    if (textData) {
      const newChannel = await interaction.guild.channels.create(textData.name, {
        type: 'GUILD_TEXT',
        nsfw: textData.nsfw,
        parent: textData.parentID,
        position: textData.position + 1,
        rateLimitPerUser: textData.rateLimit
      });
      await setPermissions(newChannel, textData.overwrites);
      textData.channelID = newChannel.id;
      await textData.save();
      return interaction.reply({ content: `**${newChannel.name}** adlı yazı kanalının yedeği başarıyla oluşturuldu.`, ephemeral: true });
    } else if (voiceData) {
      const newChannel = await interaction.guild.channels.create(voiceData.name, {
        type: 'GUILD_VOICE',
        bitrate: voiceData.bitrate,
        userLimit: voiceData.userLimit,
        parent: voiceData.parentID,
        position: voiceData.position
      });
      await setPermissions(newChannel, voiceData.overwrites);
      voiceData.channelID = newChannel.id;
      await voiceData.save();
      return interaction.reply({ content: `**${newChannel.name}** adlı ses kanalının yedeği başarıyla oluşturuldu.`, ephemeral: true });
    } else if (categoryData) {
      const newChannel = await interaction.guild.channels.create(categoryData.name, {
        type: 'GUILD_CATEGORY',
        position: categoryData.position + 1
      });
      await setPermissions(newChannel, categoryData.overwrites);
      await transferChannels(categoryData, newChannel);
      categoryData.channelID = newChannel.id;
      await categoryData.save();
      return interaction.reply({ content: `**${newChannel.name}** adlı kategori yedeği başarıyla oluşturuldu.`, ephemeral: true });
    }

    return interaction.reply({ content: "Belirtilen kanal ID'sine ait veri bulunamadı!", ephemeral: true });
  },
};

async function setPermissions(channel, overwrites) {
  const permissions = [];
  for (const overwrite of overwrites) {
    const permission = {
      id: overwrite.id,
      allow: new Permissions(overwrite.allow).toArray(),
      deny: new Permissions(overwrite.deny).toArray()
    };
    permissions.push(permission);
  }
  await channel.permissionOverwrites.set(permissions);
}

async function transferChannels(oldCategory, newCategory) {
  const textChannels = await TextChannels.find({ parentID: oldCategory.channelID });
  for (const textChannel of textChannels) {
    const channel = await interaction.guild.channels.create(textChannel.name, {
      type: 'GUILD_TEXT',
      parent: newCategory,
      position: textChannel.position
    });
    await setPermissions(channel, textChannel.overwrites);
  }

  const voiceChannels = await VoiceChannels.find({ parentID: oldCategory.channelID });
  for (const voiceChannel of voiceChannels) {
    const channel = await interaction.guild.channels.create(voiceChannel.name, {
      type: 'GUILD_VOICE',
      parent: newCategory,
      position: voiceChannel.position
    });
    await setPermissions(channel, voiceChannel.overwrites);
  }
}
