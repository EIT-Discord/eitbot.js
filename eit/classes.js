const eit =
{
    semesters: new Map(),
    roles: new Map(),
    channels: new Map(),
    activeSetups: new Map()
}



class Semester
{
    constructor(year, channel, groups)
    {
        this.year = year
        this.channel = channel
        this.groups = groups

        this.name = function ()
        {
            return `${year}. Semester`
        }
    }
}

class Group
{
    constructor(name, role, semester)
    {
        this.name = name
        this.role = role
        this.semester = semester
    }
}

module.exports = {Semester, Group, eit}