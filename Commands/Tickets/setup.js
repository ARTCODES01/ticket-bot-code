    import {
      ActionRowBuilder,
      ButtonBuilder,
      ButtonStyle,
      EmbedBuilder,
      PermissionFlagsBits,
    } from "discord.js";
        
        /**
         * @type {import("../..").Mcommand}
         */
        export default {
          name: "tsetup",
          description: "Setup Ticket System",
          userPermissions: PermissionFlagsBits.ManageGuild,
          botPermissions: PermissionFlagsBits.ManageChannels,
          category: "Tickets",
          cooldown: 5,
        
          run: async (client, message, args, prefix) => {
            // Code
            const channel =
              message.mentions.channels.first() ||
              message.guild.channels.cache.get(args.at(0));
        
            const categoryID = args.at(1);
        
            if (!channel || !categoryID) {
              return client.sendEmbed(
                message,
                {
                  title: "Command: tsetup",
                  description:
                    "> Setup the ticket system.\n```Syntax: ,tsetup (#channel) (categoryID)\nExample: ,tsetup #tickets 1128492688690393202```",
                  color: 0xff93e0,
                  author: {
                    name: `Command: tsetup`,
                    icon_url: client.user.avatarURL(),
                  },
                }
              );
            }

            const row = new ActionRowBuilder().addComponents([
              new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel("@tess")
                .setURL("https://saint.bet/tess"),
              new ButtonBuilder() // Second button
                .setStyle(ButtonStyle.Link)
                .setLabel("nsfw")
                .setURL("https://discord.com/invite/gyat"), // URL for the second button
            ]);            
    
        /**
         * @type {import("../..").TicketData}
         */
        const data = await client.tickets.get(`tickets-${message.guildId}`);
    
        const embedData = data?.embed?.ticketSetup;
    
        const color = embedData?.color || "#ff93e0"; // Use default color if not provided
    
        const embed = new EmbedBuilder()
          .setColor("#050505") // Use the provided color or the default one
          .setTitle("/Saint")
          .setImage(embedData.image)
          .setThumbnail("https://images-ext-1.discordapp.net/external/oG_T_epZ90nt3f8wJR_bmD9rTr2bib3HcZWwaDgrPZA/https/storage.sell.app/store/29046/images/dh2DUCrdUZvlxo17STRrvraVzeM9NrvZbC6AkeHy.png")
          .setFooter({
            text: "Rep /Saint 4 pic • last updated aug 19th",
            iconURL: "https://media.discordapp.net/attachments/1139135727981052006/1141450489066688552/IMG_6301.jpg"
          })
          .setAuthor({
            name: embedData.author.name,
            iconURL: message.guild.iconURL(),
          })
          .setDescription("<:aa_dot:1102971413771595787> *Follow [tos](https://discord.com/terms) & [guid](https://discord.com/guidelines)*\n<:aa_dot:1102971413771595787> *Use common **__[sense](https://saint.bet)__***\n<:aa_dot:1102971413771595787> *No Cp/D0xx/L3aks*\n<:aa_dot:1102971413771595787> *No self promotions*\n<:aa_dot:1102971413771595787> *Always skull **__[owners](https://saint.bet/tess)__***\n<:aa_dot:1102971413771595787> *Dont touch a mans waifu*");
    
        let msg = await channel.send({
          embeds: [embed],
          components: [row],
        });
    
        channel.permissionOverwrites.edit(message.guild.roles.everyone, {
          SendMessages: false,
        });
    
        await client.tickets.set(`tickets-${message.guildId}`, {
          channel: channel.id,
          ticketId: msg.id,
          categoryId: categoryID,
          embed: data?.embed,
          loggingChannel: "",
          tickets: [],
          assignedTickets: [],
        });
    
        return client.sendEmbed(message, `> <:saintess_approve:1132745067921162291> Ticket system successfully set up in ${channel}.`);
      },
    };