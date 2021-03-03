# Student Grouper

### Author: Maeghan Provencher

Live Site: http://student-grouper-app.herokuapp.com/

Demo Video: https://vimeo.com/515105204

### Description

Student Grouper allows teachers to quickly and easily generate groups of students based on their academic and social-emotional characteristics. Custom sorting algorithms written in JavaScript arrange students into academically or socially similar or varied groups of a given size. Once generated, groups can be further customized by swapping students between groups and adding notes. When showing groups to students, teachers can toggle on the "student view" which hides the information about student tiers and teacher notes. If a hard copy of the groups is needed, teachers can simply click a button to generate a print-friendly pdf document of the groups.

### Why this app?

As a teacher, I spent a lot of time thinking about how to group my students for projects, seating assignments, enrichment or intervention, and zoom breakout rooms. Most automated grouping tools are limited to making random groups. However, intentional grouping of students has been shown to lead to better learning outcomes. So I decided to create a tool that my colleagues could use to more efficiently sort students into meaningful groups.

### Installation

- Install [Docker](https://docs.docker.com/get-docker/).
- Build the docker container and start the application and postgres container.
```
$ yarn run docker
```
- Then, navigate to [http://localhost:3000](http://localhost:3000) in your browser.

### TODO

- Intructions for running the tests
- Google Classroom API integration

### Contributing

Bug reports and pull requests are welcome on GitHub at (https://github.com/maeghanpro/student-grouper). Use the [fork-and-branch](https://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/) workflow to contribute.

Contributors are expected to adhere to the [Contributor Covenant](https://www.contributor-covenant.org/version/2/0/code_of_conduct/) code of conduct.
