module.exports = {
    codeBlock(string)
    {
        return '```' + string + '```';
    },
    async fetchMemberFromUser(client, user){
        let members = await client.fetchEitMember()
        for(let member of members){
            if(member.user.id === user.id){
                return member
            }
        }
    }
};

