module.exports = {
    codeBlock(string)
    {
        return '```' + string + '```';
    },
    async fetchMemberFromUser(client, user){
        await client.fetchEitMember()
            .then(members => members.forEach(member => {
                if (member.user.id === user.id){
                    return member
                }
            }))
    }
};

