// debug file for testing only
export async function onRequestGet ({ env }) {
  env.WORDED.put('course:1', JSON.stringify({
    id: 1,
    name: 'English Course',
    description: 'Learn English from this course.',
    langs: 'EN',
    stages: 2
  }))
  env.WORDED.put('course:2', JSON.stringify({
    id: 2,
    name: 'Czech Course',
    description: 'Learn Czech from this course.',
    langs: 'CZ',
    stages: 3
  }))
  env.WORDED.put('stage:1', JSON.stringify([
    {
      id: 1,
      name: 'Introductions',
      description: 'You will learn introductions in this stage.'
    },
    {
      id: 2,
      name: 'Formality',
      description: 'You will learn formality in this stage.'
    }
  ]))
  env.WORDED.put('stage:2', JSON.stringify([
    {
      id: 1,
      name: 'Introductions',
      description: 'You will learn introductions in this stage.'
    },
    {
      id: 2,
      name: 'Formality',
      description: 'You will learn formality in this stage.'
    },
    {
      id: 3,
      name: 'Yes',
      description: 'You will learn yes in this stage.'
    }
  ]))
  env.WORDED.put('page:1:1', JSON.stringify([
    {
      src: '1',
      trans: '1'
    },
    {
      src: '1',
      trans: '1'
    },
    {
      src: '1',
      trans: '1'
    },
    {
      src: '1',
      trans: '1'
    },
    {
      src: '1',
      trans: '1'
    },
    {
      src: '1',
      trans: '1'
    },
    {
      src: '1',
      trans: '1'
    }
  ]))
  env.WORDED.put('page:1:2', JSON.stringify([
    {
      src: '2',
      trans: '2'
    },
    {
      src: '2',
      trans: '2'
    },
    {
      src: '2',
      trans: '2'
    },
    {
      src: '2',
      trans: '2'
    },
    {
      src: '2',
      trans: '2'
    },
    {
      src: '2',
      trans: '2'
    },
    {
      src: '2',
      trans: '2'
    }

  ]))
  env.WORDED.put('page:2:1', JSON.stringify([
    {
      src: '1',
      trans: '1'
    },
    {
      src: '1',
      trans: '1'
    },
    {
      src: '1',
      trans: '1'
    },
    {
      src: '1',
      trans: '1'
    },
    {
      src: '1',
      trans: '1'
    },
    {
      src: '1',
      trans: '1'
    },
    {
      src: '1',
      trans: '1'
    }
  ]))
  env.WORDED.put('page:2:2', JSON.stringify([
    {
      src: '2',
      trans: '2'
    },
    {
      src: '2',
      trans: '2'
    },
    {
      src: '2',
      trans: '2'
    },
    {
      src: '2',
      trans: '2'
    },
    {
      src: '2',
      trans: '2'
    },
    {
      src: '2',
      trans: '2'
    },
    {
      src: '2',
      trans: '2'
    }

  ]))
  env.WORDED.put('page:2:3', JSON.stringify([
    {
      src: '3',
      trans: '3'
    },
    {
      src: '3',
      trans: '3'
    },
    {
      src: '3',
      trans: '3'
    },
    {
      src: '3',
      trans: '3'
    },
    {
      src: '3',
      trans: '3'
    },
    {
      src: '3',
      trans: '3'
    },
    {
      src: '3',
      trans: '3'
    },
    {
      src: '3',
      trans: '3'
    }
  ]))

  return new Response()
}
