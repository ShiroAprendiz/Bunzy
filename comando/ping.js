exports.run = (client, message, args) => {
	
	message.channel.send(`<:emoji:480135603439140864> pong ${Math.round(client.ping)}ms`)

	console.log(`Comando ping usado em ${message.guild.name}`)
	
}
